from django.shortcuts import render_to_response, render
from django.template.context_processors import csrf
from django.http import HttpResponse, JsonResponse
from .models import Account
from theworld.settings import STATIC_URL
import construct.manager as construct
from django.contrib.auth import authenticate, login, logout
import json
from django.middleware.csrf import get_token


def index(request):
    csrf_token = get_token(request)
    response = render(request, 'index.html')
    response.set_cookie('csrftoken', csrf_token)
    return response


def create_user(request): #email, usrename, password
    errors = []
    if not request.POST.get('email', False):
        errors.append("No email")
    elif Account.objects.filter(email=request.POST['email']).count() > 0:
        errors.append('Email already exists')
    if not request.POST.get('password', False):
        errors.append('No password')
    if not request.POST.get('username', False):
        errors.append('No username')
    elif Account.objects.filter(username=request.POST['username']).count() > 0:
        errors.append('Username already exists')

    if errors:
        return JsonResponse(errors, status=409, safe=False)
    else:
        user = Account.objects.create_user(
            email=request.POST['email'],
            password=request.POST['password'],
            username=request.POST.get('username', request.POST['email']),
            role=request.POST.get('role', False)
            )
        user = authenticate(username=request.POST['email'], password=request.POST['password'])
        login(request, user)
        return JsonResponse(user.get_json(), safe=False)


def login_user(request):
    errors = []
    if not request.POST.get('email', False):
        errors.append('No email')
    if not request.POST.get('password', False):
        errors.append('No password')
    if errors:
        return JsonResponse(errors, status=409, safe=False)

    user = authenticate(username=request.POST['email'], password=request.POST['password'])
    if user:
        login(request, user)
        return JsonResponse(user.get_json(), safe=False)
    else:
        return JsonResponse(['Invalid credentiald'], status=409, safe=False)


def get_worlds(request):
    return JsonResponse(construct.get_worlds_by_user(request.user), safe=False)


def logout_user(request):
    logout(request)
    return JsonResponse({})
