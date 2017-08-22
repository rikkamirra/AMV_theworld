from construct.models import World, Article, Category
from user.models import Account
from django.core import serializers
import json

DEFAULT_CATEGORIES = []

def get_object(query_object):
    return json.loads(serializers.serialize('json', [query_object,]))[0]

def create_world(user_id, world_title):
    if Account.objects.filter(pk=user_id).count() == 0:
        return None
    author = Account.objects.get(pk=user_id)
    if not author.is_constructor:
        author.is_constructor = True
        author.save()
    world = World(name=world_title, author=author)
    world.save()
    return world


def create_category(category_name, world_id, parent_id=None):
    world = World.objects.get(pk=world_id)
    category = Category(name=category_name, world=world, parent_id=parent_id)
    category.save()
    return category


def create_article(title, body, category_id):
    article = Article(title=title, body=body)
    article.save()
    category = Category.objects.get(pk=category_id)
    category.articles.add(article)
    return article


def add_article_to_category(article_id, category_id):
    article = Article.objects.get(pk=article_id)
    category = Category.objects.get(pk=category_id)
    category.articles.add(article)


def get_world(world_id):
    res = {}
    world = World.objects.get(pk=world_id)
    res['world'] = world
    res['author'] = world.author
    res['root_categories'] = Category.objects.filter(world=world, parent_id=None)
    return res


def get_child_categories(category_id):
    return Category.objects.filter(parent_id=category_id)
