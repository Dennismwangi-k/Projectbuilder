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
    path('import/', views.import_database, name='import_database'),
    path('import/success/', views.import_success, name='import_success'),
    path('create_tables/', views.create_table, name='create_table'),
    path('save_table/', views.create_dynamic_table, name='create_dynamic_table'),
    path('create_sucess/', views.successful_table, name='sucess'),
    path('table_creation_error/', views.error_table_creation, name='error'),
    path('display/tables/', views.list_tables, name='tables'),
    path('view_myTables/<str:table_name>/', views.view_table, name='view_table'),
]

