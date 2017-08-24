from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Article
from construct.models import Category
from construct.manager import get_object, get_object_from_set


def create_article(request):
    article = article = Article.objects.create_article(request.user.pk, request.POST)
    if not article:
        return JsonResponse({}, status=409)
    return JsonResponse(get_object(article), safe=False)


def edit_article(request, article_id):
    article = Article.objects.edit_article(request.user.pk, article_id, request.POST)
    if article:
        return JsonResponse(get_object(article), safe=False)
    else:
        return JsonResponse({}, status=409)


def delete_article(request, article_id):
    Article.objects.get(pk=article_id).delete()
    return JsonResponse({})

def get_articles_by_category(request, category_id):
    category = Category.objects.get(pk=category_id)
    articles = category.articles.all()
    return JsonResponse(get_object_from_set(articles), safe=False)


def get_all_articles(request):
    articles = Article.objects.filter(world_id=request.POST.get('world_id', 1)).values('pk', 'title')
    return JsonResponse([a for a in articles], safe=False)

def add_category(request):
    _category_id = request.POST.get('category_id', 0)
    _article_id = request.POST.get('article_id', 0)
    category = Category.objects.get(pk=_category_id)
    article = Article.objects.get(pk=_article_id)
    category.articles.add(article)
    return JsonResponse({})
