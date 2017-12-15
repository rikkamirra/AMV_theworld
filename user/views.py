from django.shortcuts import render_to_response, render
from django.template.context_processors import csrf
from django.http import HttpResponse, JsonResponse

from .models import Account, Picture, PicturesRelationship
from construct.category.model import Category
from construct.world.model import World

from construct.world.serializer import WorldSerializer
from construct.category.serializer import CategorySerializer

from .serializers import AccountSerializer, PictureSerializer, PicturesRelationshipSerializer

from theworld.settings import STATIC_URL
from django.contrib.auth import authenticate, login, logout
import json
from django.middleware.csrf import get_token

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


def index(request):
    csrf_token = get_token(request)
    response = render(request, 'index.html')
    response.set_cookie('csrftoken', csrf_token)
    return response


def create_user(request):
    try:
        user = Account.objects.create(request.POST)
    except Exception as e:
        return JsonResponse([e.__str__(),], status=400, safe=False)

    user = authenticate(username=request.POST['email'], password=request.POST['password'])
    login(request, user)
    serializer = AccountSerializer(user)
    return JsonResponse(serializer.data)


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


class AccountList(APIView):
    def get(self, request):
        return Response()

    def post(self, request):
        return Response()


class AccountItem(APIView):
    def get(self, request, user_id):
        account = AccountSerializer(request.user)
        response = JsonResponse(account.data, safe=False)
        return response

    def post(self, request, user_id):
        return Response()

    def patch(self, request, user_id):
        serializer = AccountSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors(), status=400)


    def delete(self, request, user_id):
        return Response()


class AccountList(APIView):
    def get(self, request):
        return Response(AccountSerializer(Account.objects.all(), many=True).data)



class AccountPictureItem(APIView):
    def post(self, request):
        picture = Picture.objects.create(
            path=request.POST.get('path'),
            owner=request.user,
            instance_id=request.POST.get('instance_id', 0),
            instance_type=request.POST.get('instance_type', 'undefined')
            )
        picture_serializer = PictureSerializer(picture)
        return JsonResponse(picture_serializer.data)

    def get(self, request):
        serializer = PictureSerializer(Picture.objects.filter(owner=request.user), many=True)
        return Response(serializer.data)
