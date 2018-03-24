from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from .model import Article
from user.models import Picture, PicturesRelationship
from construct.world.model import World
from construct.category.model import Category

from .serializer import ArticleSerializer

from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
import re

from theworld.decorators import set_instance


class ArticleList(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def filter_queryset(self, queryset):
        if self.request.GET.get('category'):
            category = get_object_or_404(Category, id=self.request.GET.get('category'))
            return category.articles.all()
        elif self.request.GET.get('world'):
            world = get_object_or_404(World, id=self.request.GET.get('world'))
            return world.articles.all()
        else:
            return queryset

    def create(self, request):
        category = Category.objects.get(pk=request.POST.get('category'))
        article = Article.objects.create(
            title=request.POST.get('title'),
            body=request.POST.get('body'),
            world=category.world
        )
        Picture.objects.update(
            re.findall('src="(.+?)"', article.body),
            owner=request.user,
            instance_id=article.pk,
            instance_type='article',
            redirect="/constructor/"+str(category.world.id)+"/article/"+str(article.id)
        )
        category.articles.add(article)
        return Response(ArticleSerializer(article).data, status=201)


class ArticleItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def perform_update(self, serializer):
        super().perform_update(serializer)
        Picture.objects.update(
            re.findall('src="(.+?)"', self.request.data.get('body')),
            owner=self.request.user,
            instance_id=serializer.instance.id,
            instance_type='article',
            redirect=f'/constructor/{serializer.instance.world.id}/article/{serializer.instance.id}'
        )


def add_category(request):
    category = Category.objects.get(pk=request.POST.get('category_id', 0))
    article = Article.objects.get(pk=request.POST.get('article_id', 0))
    category.articles.add(article)
    return JsonResponse({})
