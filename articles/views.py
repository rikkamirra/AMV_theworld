from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Article
from user.models import Picture, PicturesRelationship
from construct.models import Category, World
from construct.manager import get_object, get_object_from_set

from .serializers import ArticleSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import re

from theworld.decorators import set_instance


class ArticleList(APIView):
    @set_instance('Category')
    def get(self, request, category):
        serializer = ArticleSerializer(category.articles.all(), many=True)
        response = Response(serializer.data)
        if category.world.is_private:
            response['Crypt'] = 'Crypt'
        return response

    @set_instance('Category', need_auth=True)
    def post(self, request, category):
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


class ArticleItem(APIView):
    @set_instance('Article')
    def get(self, request, article):
        serializer = ArticleSerializer(article)
        response = Response(serializer.data)
        if article.world.is_private:
            response['Crypt'] = 'Crypt'
        return response

    @set_instance('Article', need_auth=True)
    def put(self, request, article):
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            Picture.objects.update(
                re.findall('src="(.+?)"',
                request.data.get('body')),
                owner=request.user,
                instance_id=article.pk,
                instance_type='article',
                redirect="/constructor/"+str(article.world.id)+"/article/"+str(article.id)
                )
            response = Response(serializer.data)
            if article.world.is_private:
                response['Crypt'] = 'Crypt'
            return response
        return Response(serializer.errors, status=400)

    @set_instance('Article', need_auth=True)
    def delete(self, request, article):
        article.delete()
        return JsonResponse({})


def get_articles_by_category(request, category_id):
    category = None
    try:
        category = Category.objects.get(pk=category_id)
    except Category.DoesNotExist:
        return Response(status=404)

    serialize = ArticleSerializer(category.articles.all(), many=True)
    response = JsonResponse(serialize.data, safe=False)
    if category.world.is_private:
        response['Crypt'] = 'Crypt'
    return response


def get_articles_by_world(request, world_id):
    articles = Article.objects.filter(world=world_id).values('id', 'title')
    response = JsonResponse([a for a in articles], safe=False)
    if World.objects.get(pk=world_id).is_private:
        response['Crypt'] = 'Crypt'
    return response


def add_category(request):
    category = Category.objects.get(pk=request.POST.get('category_id', 0))
    article = Article.objects.get(pk=request.POST.get('article_id', 0))
    category.articles.add(article)
    return JsonResponse({})
