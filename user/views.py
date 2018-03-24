from django.shortcuts import render_to_response, render
from django.template.context_processors import csrf
from django.http import HttpResponse, JsonResponse

from .models import Account, Picture, PicturesRelationship
from construct.category.model import Category
from construct.world.model import World

from construct.world.serializer import WorldSerializer
from construct.category.serializer import CategorySerializer

from .serializers import (
    AccountSerializer,
    PictureSerializer
)

from theworld.settings import STATIC_URL
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework import mixins
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly
)


def index(request):
    return render(request, 'index.html')


def get_info(request):
    response = None
    if request.user:
        account = AccountSerializer(request.user)
        response = JsonResponse(account.data, safe=False)
    else:
        response = JsonResponse()
    response['csrftoken'] = get_token(request)
    return response


class RegistrationAPIView(generics.CreateAPIView):
    queryset = Account.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = AccountSerializer

    def perform_create(self, serializer):
        serializer.save()

        login(self.request, serializer.instance)


class LoginAPIView(APIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        errors = []
        if not request.POST.get('email', False):
            errors.append('No email')
        if not request.POST.get('password', False):
            errors.append('No password')
        if errors:
            return JsonResponse(errors, status=400, safe=False)

        user = authenticate(username=request.POST['email'], password=request.POST['password'])
        if user:
            login(request, user)
            serializer = AccountSerializer(user)
            return JsonResponse(serializer.data)
        else:
            return JsonResponse(['Invalid credentials'], status=400, safe=False)

    def delete(self, request):
        logout(request)
        return JsonResponse({})


class AccountItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = (IsAuthenticated,)


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
