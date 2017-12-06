from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .model import Article
from user.models import Picture, PicturesRelationship
from construct.world.model import World
from construct.category.model import Category

from .serializer import ArticleSerializer

from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import re

from theworld.decorators import set_instance


class ArticleList(APIView):
    def get(self, request):
        if (request.GET.get('category', False)):
            articles, is_private = self.__get_articles_by__('category', request.GET.get('category'))
        elif (request.GET.get('world', False)):
            articles, is_private = self.__get_articles_by__('world', request.GET.get('world'))
        else:
            articles, is_private = Article.objects.all(), True

        serializer = ArticleSerializer(articles, many=True)
        response = Response(serializer.data)
        if is_private:
            response['Crypt'] = 'Crypt'
        return response

    def post(self, request):
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

    def __get_articles_by__(self, instance_name, instance_id):
        if instance_name == 'category':
            category = Category.objects.get(pk=instance_id)
            return category.articles.all(), category.world.is_private
        elif instance_name == 'world':
            return Article.objects.filter(world_id=instance_id), World.objects.get(pk=instance_id).is_private
        else:
            return Article.objects.all(), True


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


def add_category(request):
    category = Category.objects.get(pk=request.POST.get('category_id', 0))
    article = Article.objects.get(pk=request.POST.get('article_id', 0))
    category.articles.add(article)
    return JsonResponse({})
