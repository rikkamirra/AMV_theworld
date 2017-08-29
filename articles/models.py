from django.db import models
from construct.models import Category, World


class Article(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    world_id = models.IntegerField(default=1)
