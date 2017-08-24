from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Article
from construct.models import Category
from construct.manager import get_object, get_object_from_set


def create_article(request):
    article = Article(title=request.POST['title'], body=request.POST['body'])
    article.save()
    category = Category.objects.get(pk=request.POST['category_id'])
    category.articles.add(article)
    return JsonResponse(get_object(article), safe=False)


def edit_article(request, article_id):
    article = Article.objects.get(pk=article_id)
    article.title = request.POST['title']
    article.body = request.POST['body']
    article.save()
    return JsonResponse(get_object(article), safe=False)


def delete_article(request, article_id):
    Article.objects.get(pk=article_id).delete()
    return JsonResponse({})

def get_articles_by_category(request, category_id):
    category = Category.objects.get(pk=category_id)
    articles = category.articles.all()
    return JsonResponse(get_object_from_set(articles), safe=False)
