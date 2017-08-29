from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Article
from construct.models import Category, World
from construct.manager import get_object, get_object_from_set

from .serializers import ArticleSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class ArticleList(APIView):
    def get(self, request, format=None):
        articles = Article.objects.all().values('pk', 'title')
        return Response([get_object(article) for article in articles])

    def post(self, request, format=None):
        article = Article.objects.create_article(request.user.pk, request.POST)
        if not article:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(get_object(article), status=status.HTTP_201_CREATED)


class ArticleItem(APIView):
    def get(self, request, article_id, format=None):
        article = None
        try:
            article = Article.objects.get(pk=article_id)
        except Article.DoesNotExist:
            return Response(status=404)

        serializer = ArticleSerializer(article)
        return Response(serializer.data)

    def put(self, request, article_id, format=None):
        article = None
        try:
            article = Article.objects.get(pk=article_id)
        except Article.DoesNotExist:
            return Response(status=404)
        world = World.objects.get(pk=article.world_id)
        if request.user.pk != world.author.pk:
            return Response(status=401)
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
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

    articles = category.articles.all()
    serialize = ArticleSerializer(articles, many=True)
    return JsonResponse(serialize.data, safe=False)


def get_articles_by_world(request, world_id):
    articles = Article.objects.filter(world_id=world_id)
    serializer = ArticleSerializer(articles, many=True)
    return JsonResponse(serializer.data, safe=False)


def add_category(request):
    _category_id = request.POST.get('category_id', 0)
    _article_id = request.POST.get('article_id', 0)
    category = Category.objects.get(pk=_category_id)
    article = Article.objects.get(pk=_article_id)
    category.articles.add(article)
    return JsonResponse({})
