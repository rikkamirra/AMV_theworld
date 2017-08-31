from django.db import models
from construct.models import Category, World


class Article(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    world_id = models.IntegerField(default=1)


# class Picture(models.Model):
#     path = models.URLField(max_length=255)
#     img_type = models.CharField(max_length=15, default="article") #srticle, category, world
#     instance_id = models.IntegerField()
