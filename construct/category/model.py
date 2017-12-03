from django.db import models
from articles.article.model import Article

class Category(models.Model):
    name = models.CharField(max_length=255)
    parent_id = models.IntegerField(default=0)
    articles = models.ManyToManyField('articles.Article')
    world = models.ForeignKey('construct.World', on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ('name',)
