from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.custom_home_view, name='custom_home'),
    path('', include('allauth.urls')),
    path('upload/', views.upload_files, name='upload_files'),
    path('display/', views.display_files, name='display'),
   
]

