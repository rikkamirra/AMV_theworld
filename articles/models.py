from django.db import models
from construct.models import Category, World

class ArticleManager(models.Manager):
    def create_article(self, user_id, fields):
        errors = []
        if not fields.get('title'):
            errors.append('No title')
        if not fields.get('body'):
            errors.append('No body')
        if not fields.get('category_id'):
            errors.append('No category id')

        category = Category.objects.get(pk=fields.get('category_id'))

        if category.world.author.pk != user_id:
            errors.append('No permissions')

        if errors:
            return False # Fix me

        article = self.model(
            title=fields.get('title'), body=fields.get('body')
        )

        article.save()

        category.articles.add(article)

        return article

    def edit_article(self, user_id, article_id, fields):
        category = Category.objects.get(pk=fields.get('category_id'))

        if category.world.pk != user_id:
            return False

        article = Article.objects.get(pk=article_id)

        article.title = fields.get('title')
        article.body = fields.get('body')
        article.save()

        return article



class Article(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()

    objects = ArticleManager()
