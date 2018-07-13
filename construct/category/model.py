from django.db import models
from articles.article.model import Article

class Category(models.Model):
    name = models.CharField(max_length=255)
    parent_id = models.IntegerField(default=0)
    articles = models.ManyToManyField('articles.Article')
    world = models.ForeignKey('construct.World', on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ('name',)

    @property
    def children(self):
        return type(self).objects.filter(parent_id=self.id)

    def print_category(self):
        def _print_subcategory(category, result):
            for article in category.articles.all():
                result += f'{article.title}\n\n{article.body_for_print}\n\n'

            for subcategory in category.children:
                result += _print_subcategory(subcategory, result)

            return result

        return _print_subcategory(self, '')
