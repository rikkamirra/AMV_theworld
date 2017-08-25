from django.db import models
from user.models import Account


class WorldManager(models.Manager):
    def create_world(self, user, fields):
        user.is_constructor = True
        user.save()

        world = self.model(
            name=fields.get('title'),
            author=user
        )
        world.save()
        return world


class World(models.Model):
    name = models.CharField(max_length=255)
    author = models.ForeignKey('user.Account')

    objects = WorldManager()



class CategoryManager(models.Manager):
    def create_category(self, user, fields):
        world = World.objects.get(pk=fields.get('world_id'))
        if world.author.pk != user.pk:
            return False

        category = self.model(
            name=fields.get('name'),
            world=world,
            parent_id=fields.get('parent_id', 0)
        )

        category.save()
        return category


class Category(models.Model):
    name = models.CharField(max_length=255)
    parent_id = models.IntegerField(null=True)
    articles = models.ManyToManyField('articles.Article')
    world = models.ForeignKey(World)

    objects = CategoryManager()
