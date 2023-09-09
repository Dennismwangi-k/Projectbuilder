from django.apps import apps
from django.shortcuts import render, redirect, reverse
from django.db import connection, IntegrityError
from .forms import UploadFileForm,DatabaseImportForm
from .models import UploadedFile, ImportedTable, DynamicTable
import pandas as pd
import os
import openpyxl
from django import forms
import matplotlib.pyplot as plt
import networkx as nx
from django.conf import settings
from django.contrib import messages
data_frames = []

def import_success(request):
    return render(request, 'import_success.html')

def import_database(request):
    if request.method == 'POST':
        form = DatabaseImportForm(request.POST, request.FILES)
        if form.is_valid():
            uploaded_file = request.FILES['database_file']
            # Process uploaded_file, extract data using pandas
            data = pd.read_excel(uploaded_file, engine='openpyxl')  # Specify the engine
            # data = pd.read_excel(uploaded_file, engine='openpyxl')


            # Save data to ImportedTable model
            for index, row in data.iterrows():
                imported_item = ImportedTable(field1=row['field1'], field2=row['field2'])
                imported_item.save()

            return redirect('import_success')  # Redirect to a success page
    else:
        form = DatabaseImportForm()

    return render(request, 'import_database.html', {'form': form})




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
    return render(request, "signup.html")


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

# creating table
def create_table(request):
    return render(request, 'create_table.html')


def successful_table(request):
    return render(request, 'success_table.html')

def error_table_creation(request):
    return render(request, 'table_error.html')


def create_dynamic_table(request):
    if request.method == 'POST':
        table_name = request.POST.get('table_name')
        columns = request.POST.getlist('column_name')
        data_types = request.POST.getlist('data_type')

        # Create a new table with the provided name
        cursor = connection.cursor()
        try:
            # CREATING TABLE IN DATABASE ENGINE
            cursor.execute(f'CREATE TABLE {table_name} (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT);')

            # Add columns to the table
            for column_name, data_type in zip(columns, data_types):
                cursor.execute(f'ALTER TABLE {table_name} ADD COLUMN {column_name} {data_type};')

            # Create a record in the DynamicTable model to store information about the created table
            dynamic_table = DynamicTable(table_name=table_name)
            dynamic_table.save()

            # Redirect to a success page after creation
            return redirect('sucess')

        except IntegrityError:
            connection.rollback()
            return render(request, 'table_error.html', {'error_message': 'Table name already exists'})

        except Exception as e:
            connection.rollback()
            return render(request, 'table_error.html', {'error_message': str(e)})

    return render(request, 'create_table.html')


# getting the table list
def list_tables(request):
    table_names = DynamicTable.objects.values_list('table_name', flat=True)
    return render(request, 'table_list.html', {'table_names': table_names})

# function to view table
def view_table(request, table_name):
    try:
        dynamic_table = DynamicTable.objects.get(table_name=table_name)
        model = apps.get_model(app_label='appbuilder', model_name='DynamicTable')

        table_data = model.objects.all()
        columns = [field.name for field in model._meta.get_fields() if field.name != 'id']
        return render(request, 'view_table.html',
                      {'table_name': table_name, 'columns': columns,
                       'table_data': table_data})

    except DynamicTable.DoesNotExist:
        # Handle the case where the table doesn't exist
        return render(request, 'table_not_found.html')