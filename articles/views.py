from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Article
from construct.models import Category
from construct.manager import get_object, get_object_from_set


def create_article(request):
    errors = []
    if not request.POST.get['title', False]:
        errors.append('No title')
    if not request.POST.get('body', False):
        errors.append('No body')
    if errors:
        return JsonResponse(errors, status=409, safe=False)
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


def get_all_articles(request):
    articles = Article.objects.all().values('pk', 'title')
    return JsonResponse(get_object_from_set(articles))

def add_category(request):
    _category_id = request.POST.get('category_id', 0)
    _article_id = request.POST.get('article_id', 0)
    category = Category.objects.get(pk=_category_id)
    article = Article.objects.get(pk=_article_id)
    category.articles.add(article)
    return JsonResponse({})
