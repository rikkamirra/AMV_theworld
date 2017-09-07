from django.db import models

class World(models.Model):
    name = models.CharField(max_length=255)
    author = models.ForeignKey('user.Account')
    picture = models.URLField(max_length=255, null=True, blank=True)
    is_private = models.BooleanField(default=True)



class Category(models.Model):
    name = models.CharField(max_length=255)
    parent_id = models.IntegerField(default=0)
    articles = models.ManyToManyField('articles.Article')
    world = models.ForeignKey(World, null=True)
