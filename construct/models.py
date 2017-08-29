from django.db import models

from user.models import Account

from rest_framework.parsers import JSONParser


class World(models.Model):
    name = models.CharField(max_length=255)
    author = models.ForeignKey('user.Account')



class CategoryManager(models.Manager):
    def create_category(self, user, fields):
        world = World.objects.get(pk=fields.get('world_id'))
        if world.author.pk != user.pk:
            return False

        category = self.model(
            name=fields.get('name'),
            world=world,
            parent_id=fields.get('parent_id', 0)
        )

        category.save()
        return category


class Category(models.Model):
    name = models.CharField(max_length=255)
    parent_id = models.IntegerField(null=True)
    articles = models.ManyToManyField('articles.Article')
    world = models.ForeignKey(World)

    objects = CategoryManager()


class Article(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    world_id = models.IntegerField(default=1)
