from django.shortcuts import render, redirect
from .forms import UploadFileForm
from .models import UploadedFile
import pandas as pd
import os
import openpyxl
from django import forms




# data_frame_utils.py
data_frames = []

def load_data_frames():
    global data_frames
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
# views.py
def display_files(request):
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

def generate_form(request, table_name):
    # Retrieve the selected data frame based on table_name
    selected_data_frame = None
    for entry in data_frames:
        if entry['name'] == table_name:
            selected_data_frame = entry['data_frame']
            break
    class DynamicTableForm(forms.Form):
        def __init__(self, *args, **kwargs):
            super(DynamicTableForm, self).__init__(*args, **kwargs)
            for column in selected_data_frame.columns:
                self.fields[column] = forms.CharField()

    if request.method == 'POST':
        form = DynamicTableForm(request.POST)
        if form.is_valid():
            pass
    else:
        form = DynamicTableForm()

    return render(request, 'form_builder.html', {'form': form})


def custom_home_view(request):
    return redirect('account_login')

def login(request):
    return render(request, "appbuilder/login.html")

def signup(request):
    return render(request, "appbuilder/signup.html")