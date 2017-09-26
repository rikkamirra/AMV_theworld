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


class ArticleList(APIView):

    def get(self, request, format=None):
        articles = Article.objects.all().values('pk', 'title')
        return Response([article for article in articles])

    def post(self, request, format=None):
        world = World.objects.get(pk=request.POST.get('world'))
        if request.user.pk != world.author.pk:
            return Response(status=403)
        category = Category.objects.get(pk=request.POST.get('category_id'))
        article = Article.objects.create(
            title=request.POST.get('title'),
            body=request.POST.get('body'),
            world=world
            )
        Picture.objects.update(
            re.findall('src="(.+?)"', article.body),
            owner=request.user,
            instance_id=article.pk,
            instance_type='article',
            redirect="/constructor/"+str(world.id)+"/article/"+str(article.id)
            )
        category.articles.add(article)
        return Response(status=201)


class ArticleItem(APIView):
    def get(self, request, article_id, format=None):
        try:
            article = Article.objects.get(pk=article_id)
        except Article.DoesNotExist:
            return Response(status=404)

        serializer = ArticleSerializer(article)
        response = Response(serializer.data)
        if article.world.is_private:
            response['Crypt'] = 'Crypt'
        return response

    def put(self, request, article_id, format=None):
        article = None
        try:
            article = Article.objects.get(pk=article_id)
        except Article.DoesNotExist:
            return Response(status=404)

        if request.user.pk != article.world.author.pk:
            return Response(status=401)
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


    def delete(self, request, article_id, format=None):
        Article.objects.get(pk=article_id).delete()
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
