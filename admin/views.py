from django.shortcuts import render

from articles.article.model import Article
from articles.article.serializer import ArticleSerializer
from articles.comment.model import Comment
from articles.comment.serializer import CommentSerializer

from user.models import Account
from construct.world.model import World
from construct.world.serializer import WorldSerializer
from construct.category.model import Category
from construct.category.serializer import CategorySerializer

from user.models import Account, PicturesRelationship, Picture
from user.serializers import AccountSerializer, PicturesRelationshipSerializer, PictureSerializer

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import mixins
from rest_framework import generics


class AdminPermission(permissions.BasePermission):
    message = 'You are not an admin'

    def has_permission(self, request, vew):
        return request.user and request.user.is_admin

class AdminRegister(type):
    def __init__(cls, name, bases, nmspc):
        super(AdminRegister, cls).__init__(name, bases, nmspc)

def register_admin(instance_name):
    view_name = instance_name + 'AdminView'
    view_item_name = instance_name + 'ItemAdminView'
    nmspc = {
        'permission_classes': (AdminPermission,),
        'queryset': globals()[instance_name].objects.all(),
        'serializer_class': globals()[instance_name + 'Serializer']
    }
    new_admin_class_view = type(view_name, (generics.ListCreateAPIView,), nmspc)
    new_admin_item_class_view = type(view_item_name, (generics.RetrieveUpdateDestroyAPIView,), nmspc)
    scope = globals()
    scope[view_name] = new_admin_class_view
    scope[view_item_name] = new_admin_item_class_view


INSTANCES = [
    'Account',
    'Article',
    'Comment',
    'World',
    'Category',
    'Account',
    'Picture',
    'PicturesRelationship'
]

for instance in INSTANCES:
    register_admin(instance)
