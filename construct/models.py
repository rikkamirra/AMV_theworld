from django.db import models


class World(models.Model):
    name = models.CharField(max_length=255)
    author = models.ForeignKey('user.Account')


class Category(models.Model):
    name = models.CharField(max_length=255)
    parent_id = models.IntegerField(null=True)
    articles = models.ManyToManyField('articles.Article')
    world = models.ForeignKey(World)
