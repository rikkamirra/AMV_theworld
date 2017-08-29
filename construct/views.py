from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
import json
import construct.manager as manager

from construct.models import World, Category

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class WorldList(APIView):
    def get(self, request):
        return Response([manager.get_object(world) for world in World.objects.all()])

    def post(self, request):
        world = World.objects.create_world(request.user, request.POST)
        return Response(manager.get_object(world))


class WorldItem(APIView):
    def get(self, request, world_id):
        world = World.objects.get(pk=world_id)
        access_to_change = False
        if request.user.pk == world.author.pk:
            access_to_change = True
        world = manager.get_object(world)
        world['access_to_change'] = access_to_change
        world['categories'] = [manager.get_object(category) for category in Category.objects.filter(world_id=world_id, parent_id=0)]
        return Response(world)

    def put(self, request, world_id):
        world = World.objects.get(pk=world_id)
        world.name = request.data.get('name')
        world.save()
        return Response(manager.get_object(world))

    def delete(self, request, world_id):
        return Response({})


class CategoryList(APIView):
    def post(self, request):
        errors = []
        if not request.POST.get('name', False):
            errors.append('No name')
        if not request.POST.get('world_id', False):
            errors.append('No world id')
        if errors:
            return Response(errors, status=409)

        category = Category.objects.create_category(request.user, request.POST)
        if not category:
            return Response({}, status=401)

        categories = Category.objects.filter(world=World.objects.get(pk=request.POST['world_id']), parent_id=request.POST.get('parent_id', 0))
        return Response(manager.get_object_from_set(categories))


class CategoryItem(APIView):
    def get(self, request, category_id):
        chain = []
        manager.get_category_chain(category_id, chain)
        return Response(manager.get_object_from_set(chain))

    def put(self, request, category_id):
        category = Category.objects.get(pk=category_id)
        category.name = request.data.get('name')
        category.save()
        return Response(manager.get_object(category))

    def delete(self, request, category_id):
        manager.delete_category(category_id)
        return Response({})


def create_world(request):
    if not request.POST.get('title'):
        return JsonResponse(['No title'], status=409, safe=False)
    world = World.objects.create_world(request.user, request.POST)
    return JsonResponse(manager.get_object(world), safe=False)

def delete_world(request, world_id):
    return JsonResponse({})

def get_world(request, world_id):
    if World.objects.filter(pk=world_id).count() == 0:
        return JsonResponse({}, status=404)
    world = World.objects.get(pk=world_id)
    access_to_change = False
    if world.author.pk == request.user.pk:
        access_to_change = True

    world = manager.get_object(world)
    world['access_to_change'] = access_to_change
    world['categories'] = [manager.get_object(category) for category in Category.objects.filter(world=world_id, parent_id=0)]

    return JsonResponse(world, safe=False)


def get_children(request, parent_id):
    return JsonResponse(manager.get_child_categories(parent_id), safe=False)
