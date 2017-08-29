from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Article
from construct.models import Category, World
from construct.manager import get_object, get_object_from_set

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
        if Article.objects.filter(pk=article_id).count() == 0:
            return Response({}, status=HTTP_404_NOT_FOUND)

        article = Article.objects.get(pk=article_id)
        world = World.objects.get(pk=article.world_id)
        categories = article.category_set.all()

        article = get_object(article)
        article['world'] = get_object(world)
        article['categories'] = [get_object(category) for category in categories]
        return Response(article)

    def put(self, request, article_id, format=None):
        print(request.data)
        article = Article.objects.edit_article(request.user.pk, article_id, request.data)
        if article:
            return JsonResponse(get_object(article), safe=False)
        else:
            return JsonResponse({}, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, article_id, format=None):
        Article.objects.get(pk=article_id).delete()
        return JsonResponse({})


def get_articles_by_category(request, category_id):
    category = Category.objects.get(pk=category_id)
    articles = category.articles.all()
    return JsonResponse(get_object_from_set(articles), safe=False)


def get_articles_by_world(request, world_id):
    articles = Article.objects.filter(world_id=world_id).values('pk', 'title')
    return JsonResponse([a for a in articles], safe=False)

def add_category(request):
    _category_id = request.POST.get('category_id', 0)
    _article_id = request.POST.get('article_id', 0)
    category = Category.objects.get(pk=_category_id)
    article = Article.objects.get(pk=_article_id)
    category.articles.add(article)
    return JsonResponse({})
