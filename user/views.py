from django.shortcuts import render_to_response, render
from django.template.context_processors import csrf
from django.http import HttpResponse, JsonResponse

from .models import Account, Picture, PicturesRelationship
from construct.models import World, Category

from construct.serializers import WorldSerializer, CategorySerializer
from .serializers import AccountSerializer, PictureSerializer, PicturesRelationshipSerializer

from theworld.settings import STATIC_URL
import construct.manager as construct
from django.contrib.auth import authenticate, login, logout
import json
from django.middleware.csrf import get_token

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


def permit(request, *args):
    fields = {}
    for arg in args:
        fields[arg] = request.get(arg, None)
    return fields



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
        serializer = AccountSerializer(user)
        return JsonResponse(user.data)


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
        serializer = AccountSerializer(user)
        return JsonResponse(serializer.data)
    else:
        return JsonResponse(['Invalid credentiald'], status=409, safe=False)


def get_info(request):
    account = AccountSerializer(request.user)
    return JsonResponse(account.data, safe=False)


def logout_user(request):
    logout(request)
    return JsonResponse({})



class AccountPictureItem(APIView):
    def post(self, request):
        picture = Picture.objects.create(request.POST)
        picture_serializer = PictureSerializer(picture)
        return JsonResponse(picture_serializer.data)

    def get(self, request):
        serializer = PictureSerializer(Picture.objects.filter(owner=request.user), many=True)
        return Response(serializer.data)
