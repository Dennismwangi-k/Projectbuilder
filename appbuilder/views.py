from django.shortcuts import render, redirect

def custom_home_view(request):
    return redirect('account_login')

def login(request):
    return render(request, "appbuilder/login.html")

def signup(request):
    return render(request, "appbuilder/signup.html")