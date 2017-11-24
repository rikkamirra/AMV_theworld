from django.db import models
from articles.article.model import Article
from user.models import Account


class Comment(models.Model):
    author = models.ForeignKey(Account)
    text = models.TextField()
    article = models.ForeignKey(Article, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('created_at',)
