from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
import json
import construct.manager as manager

from construct.models import World, Category, Article


def world(request):
    World.objects.all().delete()
    if request.method == 'POST':
        if not request.POST.get('title'):
            return JsonResponse(['No title'], status=409, safe=False)
        world = manager.create_world(request.user.pk, request.POST['title'])
        return JsonResponse(manager.get_object(world), safe=False)
    else:
        return JsonResponse({})


def get_world(request, world_id):
    return JsonResponse(manager.get_world(world_id), safe=False)


def category(request):
    if request.method == 'POST':
        errors = []
        if not request.POST.get('name', False):
            errors.append('No name')
        if not request.POST.get('world_id', False):
            errors.append('No world id')
        if errors:
            return JsonResponse(errors, safe=False)
        world = World.objects.get(pk=request.POST['world_id'])
        manager.create_category(request.POST['name'], request.POST['world_id'], parent_id=request.POST.get('parent_id', 0))
        categories = Category.objects.filter(world=world)
        return JsonResponse(manager.get_object_from_set(categories), safe=False)
