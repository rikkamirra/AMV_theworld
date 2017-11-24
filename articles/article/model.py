from django.db import models


class ArticleManager(models.Manager):
    def clear(self):
        articles = self.model.objects.all()
        for article in articles:
            if article.category_set.all().count() == 0:
                article.delete()



class Article(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    world = models.ForeignKey('construct.World', on_delete=models.CASCADE, null=True)

    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = ArticleManager()

    def get_comments(self):
        return Comment.objects.filter(article_id=self.id)

    class Meta:
        ordering = ('title',)
