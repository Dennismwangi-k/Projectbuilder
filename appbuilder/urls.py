from django.urls import path, include
from . import views
app_name = 'appbuilder'
urlpatterns = [
    path('', views.custom_home_view, name='custom_home'),
    path('', include('allauth.urls')),
]
