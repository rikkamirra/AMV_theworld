from django.db import models
from articles.article.model import Article

class World(models.Model):
    name = models.CharField(max_length=255)
    author = models.ForeignKey('user.Account', on_delete=models.CASCADE)
    picture = models.URLField(max_length=255, null=True, blank=True, default='http://res.cloudinary.com/drjvh4g6x/image/upload/v1506594585/browseruploads/nih2x4dfjj31jpa3tmu9.jpg')
    is_private = models.BooleanField(default=True)

    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_articles(self):
        return Article.objects.filter(world_id=self.id)

    class Meta:
        ordering = ('created_at',)
