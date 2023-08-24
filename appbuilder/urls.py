from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.custom_home_view, name='custom_home'),
    path('', include('allauth.urls')),
    path('upload/', views.upload_files, name='upload_files'),
    path('display/', views.display_files, name='display'),
    path('generate_form/<str:table_name>/', views.generate_form, name='generate_form'),
    path('query/', views.query_by_columns, name='query_by_columns'),
    path('display_relationships/', views.display_relationships, name='display_relationships'),
   
]

