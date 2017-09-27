# from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# from django.core import serializers
# import json
import construct.manager as manager

from construct.models import World, Category
from articles.models import Article
from user.models import Picture
from .serializers import WorldSerializer, CategorySerializer
from articles.serializers import ArticleSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.parsers import JSONParser

from theworld.decorators import set_instance


class WorldList(APIView):
    def get(self, request):
        worlds = World.objects.all()
        serializer = WorldSerializer(worlds, many=True)
        return Response(serializer.data)

    def post(self, request):
        if not request.user.is_constructor:
            request.user.is_constructor = True
            request.user.save()

        serializer = WorldSerializer(data=request.POST)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class WorldItem(APIView):
    @set_instance('World', False)
    def get(self, request, world):
        serializer = WorldSerializer(world)
        return Response(serializer.data)

    @set_instance('World', True)
    def put(self, request, world):
        serializer = WorldSerializer(world, data=request.data)
        if serializer.is_valid():
            serializer.save()
            if request.data.get('picture'):
                Picture.objects.update(
                    [request.data.get('picture')],
                    owner=request.user,
                    instance_type='world',
                    instance_id=world.id,
                    redirect="/constructor/"+str(world.id)
                    )
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    @set_instance('World', True)
    def delete(self, request, world):
        world.delete()
        return Response(status=200)
