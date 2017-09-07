# from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# from django.core import serializers
# import json
import construct.manager as manager

from construct.models import World, Category
from articles.models import Article
from .serializers import WorldSerializer, CategorySerializer
from articles.serializers import ArticleSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.parsers import JSONParser


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
    def get(self, request, world_id):
        world = None
        try:
            world = World.objects.get(pk=world_id)
        except World.DoesNotExist:
            return Response(status=404)

        serializer = WorldSerializer(world)
        if request.user.pk == world.author.pk:
            serializer.data['access_to_change'] = True
        return Response(serializer.data)

    def put(self, request, world_id):
        world = None
        try:
            world = World.objects.get(pk=world_id)
        except World.DoesNotExist:
            return Response(status=404)

        if request.user.pk != world.author.pk:
            return Response(status=403)

        serializer = WorldSerializer(world, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, world_id):
        world = None
        try:
            world = World.objects.get(pk=world_id)
        except World.DoesNotExist:
            return Response(status=404)

        if world.author.pk != request.user.pk:
            return Response(status=403)

        categories = Category.objects.filter(world=world)
        articles = Article.objects.filter(world=world)

        world.delete()
        categories.delete()
        articles.delete()
        return Response(status=200)


class CategoryList(APIView):
    def post(self, request):
        world = World.objects.get(pk=request.POST.get('world'))
        if world.author.pk != request.user.pk:
            return Response(status=401)
        serialize = CategorySerializer(data=request.POST)
        if serialize.is_valid():
            serialize.save()
            categories = Category.objects.filter(
                world=World.objects.get(pk=request.POST['world']),
                parent_id=request.POST.get('parent_id')
                )
            serialized_categories = CategorySerializer(categories, many=True)
            return Response(serialized_categories.data)
        return Response(serialize.errors, status=400)


class CategoryItem(APIView):
    def get(self, request, category_id):
        chain = []
        category = Category.objects.get(pk=category_id)
        chain.append(category)
        while True:
            category = Category.objects.get(pk=category.parent_id)
            chain.append(category)
            if category.parent_id == 0:
                break
        serialize = CategorySerializer(chain, many=True)
        return JsonResponse(serialize.data, safe=False)

    def put(self, request, category_id):
        category = None
        try:
            category = Category.objects.get(pk=category_id)
        except Category.DoesNotExist:
            return Response(status=404)

        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, category_id):
        try:
            category = Category.objects.get(pk=category_id)
        except Category.DoesNotExist:
            return Response(status=404)

        if category.world.author.pk != request.user.pk:
            return Response(status=403)

        def delete_category(category_id):
            category = Category.objects.get(pk=category_id)
            category.articles.remove()
            category.delete()
            children = Category.objects.filter(parent_id=category_id);
            for child in children:
                delete_category(child.pk)

        delete_category(category_id)
        return Response({})



def get_children(request, parent_id):
    children = Category.objects.filter(parent_id=parent_id)
    serialize = CategorySerializer(children, many=True)
    return JsonResponse(serialize.data, safe=False)
