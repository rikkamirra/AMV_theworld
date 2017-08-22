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
