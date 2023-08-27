from django.shortcuts import render, redirect
from .forms import UploadFileForm
from .models import UploadedFile
import pandas as pd
import os
import openpyxl
from django import forms
import matplotlib.pyplot as plt
import networkx as nx
from django.conf import settings
data_frames = []

def home(request):
    return render(request, 'dashboard.html')

def load_data_frames():
    print("load_data_frames called")
    global data_frames
    data_frames = []
    uploaded_files = UploadedFile.objects.all()
    for file in uploaded_files:
        try:
            if os.path.exists(file.file.path):
                if file.name.endswith('.csv'):
                    data_frame = pd.read_csv(file.file, encoding='utf-8')
                    data_frames.append({'name': file.name, 'data_frame': data_frame})
                elif file.name.endswith('.xlsx'):
                    data_frame = pd.read_excel(file.file, engine='openpyxl')
                    data_frames.append({'name': file.name, 'data_frame': data_frame})
                elif file.name.endswith('.accdb'):
                    pass
                elif file.name.endswith('.sql'):
                    pass
        except pd.errors.EmptyDataError:
            pass
        except UnicodeDecodeError:
            pass

def upload_files(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            for file in request.FILES.getlist('files'):
                UploadedFile.objects.create(name=file.name, file=file)
            return redirect('display')
    else:
        form = UploadFileForm()
    return render(request, 'upload.html', {'form': form})

def display_files(request):
    print("display_files view called")
    load_data_frames()
    uploaded_files = UploadedFile.objects.all()
    data_frames = []

    for file in uploaded_files:
        try:
            if os.path.exists(file.file.path):
                if file.name.endswith('.csv'):
                    data_frame = pd.read_csv(file.file, encoding='utf-8')
                    data_frames.append({'name': file.name, 'data_frame': data_frame})
                elif file.name.endswith('.xlsx'):
                    data_frame = pd.read_excel(file.file, engine='openpyxl')
                    data_frames.append({'name': file.name, 'data_frame': data_frame,})
                elif file.name.endswith('.accdb'):
                    pass
                elif file.name.endswith('.sql'):
                    pass
        except pd.errors.EmptyDataError:
            pass
        except UnicodeDecodeError:
            pass

    return render(request, 'display_files.html', {'data_frames': data_frames})


data_frames = [
    {
        'name': 'table1',
        'data_frame': ...  
    },
    
]

class DynamicTableForm(forms.Form):
    def __init__(self, selected_data_frame, *args, **kwargs):
        super(DynamicTableForm, self).__init__(*args, **kwargs)
        for column in selected_data_frame.columns:
            self.fields[column] = forms.CharField(initial=selected_data_frame[column].iloc[0])


def generate_form(request, table_name):
    selected_data_frame = None
    for entry in data_frames:
        if entry['name'] == table_name:
            selected_data_frame = entry['data_frame']
            break
    
    if selected_data_frame is None:
        return render(request, 'error_page.html')

    current_index = 0
    if request.method == 'POST':
        navigate_action = request.POST.get('navigate')
        current_index = int(request.POST.get('current_index', 0))

        if navigate_action:
            if navigate_action == 'first':
                current_index = 0
            elif navigate_action == 'previous':
                current_index = max(0, current_index - 1)
            elif navigate_action == 'next':
                current_index = min(len(selected_data_frame) - 1, current_index + 1)
            elif navigate_action == 'last':
                current_index = len(selected_data_frame) - 1

    form = DynamicTableForm(selected_data_frame, initial=selected_data_frame.iloc[current_index].to_dict())
    form.fields['current_index'] = forms.IntegerField(widget=forms.HiddenInput(), initial=current_index)

    has_previous = current_index > 0
    has_next = current_index < len(selected_data_frame) - 1

    return render(request, 'form_builder.html', {'form': form, 'has_previous': has_previous, 'has_next': has_next})


def custom_home_view(request):
    return redirect('account_login')

def login(request):
    return render(request, "appbuilder/login.html")

def signup(request):
    return render(request, "appbuilder/signup.html")


def query_by_columns(request):
    if request.method == 'POST':
        column_names = request.POST.get('column_names')
        column_list = [col.strip() for col in column_names.split(',')]
        
        merged_data = None
        load_data_frames()

        for col in column_list:
            for df_entry in data_frames:
                df = df_entry.get('data_frame')
                if not isinstance(df, pd.DataFrame):
                    continue  
                if col in df.columns:
                    subset_data = df[[col]]
                    if merged_data is None:
                        merged_data = subset_data.copy()
                    else:
                        merged_data = pd.merge(merged_data, subset_data, left_index=True, right_index=True, how='outer')


        return render(request, 'query_columns.html', {'merged_data': merged_data})
    
    return render(request, 'query_columns.html')




def find_relationships(data_frames):
    G = nx.Graph()
    
    for df_info in data_frames:
        G.add_node(df_info['name'], columns=list(df_info['data_frame'].columns))

    for i in range(len(data_frames)):
        for j in range(i+1, len(data_frames)):
            df1 = data_frames[i]['data_frame']
            df2 = data_frames[j]['data_frame']

            common_columns = set(df1.columns).intersection(df2.columns)
            for col in common_columns:
                G.add_edge(data_frames[i]['name'], data_frames[j]['name'], column=col)

    return G


def display_relationships(request):
    load_data_frames()

    G = find_relationships(data_frames)
    nodes_data = [(node, data) for node, data in G.nodes(data=True)]

    plt.figure(figsize=(12, 8))
    pos = nx.spring_layout(G)
    nx.draw(G, pos, with_labels=True, node_size=3000, node_color="lightblue", font_size=15)
    edge_labels = nx.get_edge_attributes(G, 'column')
    nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels)
    graph_path = os.path.join(settings.BASE_DIR, 'appbuilder', 'static', 'appbuilder', 'images', 'graph.png')
    os.makedirs(os.path.dirname(graph_path), exist_ok=True)
    
    plt.savefig(graph_path, format="PNG")
    return render(request, 'display_relationships.html', {
        'graph_path': '/static/appbuilder/images/graph.png',
        'nodes_data': nodes_data
    })
