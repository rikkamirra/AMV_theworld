from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
import json
import construct.manager as manager

from construct.models import World, Category, Article


def create_world(request):
    if not request.POST.get('title'):
        return JsonResponse(['No title'], status=409, safe=False)
    world = manager.create_world(request.user.pk, request.POST['title'])
    return JsonResponse(manager.get_object(world), safe=False)

def delete_world(request, world_id):
    return JsonResponse({})

def get_world(request, world_id):
    return JsonResponse(manager.get_world(world_id), safe=False)


def create_category(request):
    errors = []
    if not request.POST.get('name', False):
        errors.append('No name')
    if not request.POST.get('world_id', False):
        errors.append('No world id')
    if errors:
        return JsonResponse(errors, status=409, afe=False)
    world = World.objects.get(pk=request.POST['world_id'])
    manager.create_category(request.POST['name'], request.POST['world_id'], parent_id=request.POST.get('parent_id', 0))
    categories = Category.objects.filter(world=world, parent_id=request.POST.get('parent_id', 0))
    return JsonResponse(manager.get_object_from_set(categories), safe=False)

def delete_category(request, category_id):
    manager.delete_category(category_id)
    return JsonResponse({})

def get_children(request, parent_id):
    return JsonResponse(manager.get_child_categories(parent_id), safe=False)


def create_article(request):
    errors = []
    if not request.POST.get('title', False):
        errors.append('No title')
    if not request.POST.get('body', False):
        errors.append('No text body')
    if not request.POST.get('category_id', False):
        errors.append('No category id')
    if errors:
        return JsonResponse(errors, status=409, safe=False)
    article = manager.create_article(request.POST['title'], request.POST['body'], request.POST['category_id'])
    return JsonResponse(article, safe=False)
