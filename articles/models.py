from django.db import models



class Article(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    world = models.ForeignKey('construct.World', null=True)

    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
