from construct.models import World, Category
from user.models import Account
from django.core import serializers
import json

DEFAULT_CATEGORIES = []

def get_object(query_object):
    return json.loads(serializers.serialize('json', [query_object,]))[0]

def get_object_from_set(query_set):
    return json.loads(serializers.serialize('json', query_set))


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


def get_world(world_id):
    world = get_object(World.objects.get(pk=world_id))
    categories = get_object_from_set(Category.objects.filter(world=world_id, parent_id=0))
    world['categories'] = categories
    return world


def get_all_worlds():
    _worlds = get_object_from_set(World.objects.all())
    worlds = []
    for _w in _worlds:
        worlds.append(get_object_from_set(_w.pk))
    return worlds


def get_worlds_by_user(user):
    return get_object_from_set(World.objects.filter(author=user))


def get_category_chain(category_id, chain):
    category = Category.objects.get(pk=category_id)
    chain.append(category)
    if category.parent_id != 0:
        get_category_chain(category.parent_id, chain)
    else:
        chain.append(category.world)


def get_child_categories(category_id):
    return get_object_from_set(Category.objects.filter(parent_id=category_id))


def delete_category(category_id):
    category = Category.objects.get(pk=category_id).delete()
    children = Category.objects.filter(parent_id=category_id);
    for child in children:
        delete_category(child.pk)
