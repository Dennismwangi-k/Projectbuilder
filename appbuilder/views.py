from django.shortcuts import render, redirect
from .forms import UploadFileForm
from .models import UploadedFile
import pandas as pd
import os
import openpyxl


def upload_files(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            for file in request.FILES.getlist('files'):
                UploadedFile.objects.create(name=file.name, file=file)
            return redirect('appbuilder:display')
    else:
        form = UploadFileForm()
    return render(request, 'upload.html', {'form': form})


def display_files(request):
    uploaded_files = UploadedFile.objects.all()
    data_frames = []

    for file in uploaded_files:
        try:
            if os.path.exists(file.file.path):
                if file.name.endswith('.csv'):
                    data_frame = pd.read_csv(file.file, encoding='utf-8')
                    data_frames.append(data_frame)
                elif file.name.endswith('.xlsx'):
                    data_frame = pd.read_excel(file.file, engine='openpyxl')
                    data_frames.append(data_frame)
                elif file.name.endswith('.accdb'):
                    pass
                elif file.name.endswith('.sql'):
                    pass
        except pd.errors.EmptyDataError:
            pass  
        except UnicodeDecodeError:
            pass  

    return render(request, 'display_files.html', {'data_frames': data_frames})


def custom_home_view(request):
    return redirect('account_login')

def login(request):
    return render(request, "appbuilder/login.html")

def signup(request):
    return render(request, "appbuilder/signup.html")