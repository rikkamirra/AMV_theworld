import re

from django.db import models

from user.models import PicturesRelationship


class ArticleManager(models.Manager):
    def clear(self):
        articles = self.model.objects.all()
        for article in articles:
            if article.category_set.all().count() == 0:
                article.delete()



class Article(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    world = models.ForeignKey('construct.World', on_delete=models.CASCADE, null=True, related_name='articles')

    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = ArticleManager()

    def get_comments(self):
        return Comment.objects.filter(article_id=self.id)

    def delete(self):
        picture_relationships = PicturesRelationship.objects.filter(instance_type='article', instance_id=self.id)
        picture_relationships.delete()
        super().delete()

    class Meta:
        ordering = ('title',)

    @property
    def body_for_print(self):
        return re.sub(r'<.*?>', '', self.body)
