from rest_framework import serializers
from user.models import Account
from construct.models import World, Category
from construct.serializers import CategorySerializer, WorldSerializer
from articles.models import Article


class ArticleSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()
    # world = serializers.SerializerMethodField()
    body = serializers.CharField(required=False)

    # def get_world(self, obj):
    #     world = World.objects.get(pk=obj.world_id)
    #     serializer = WorldSerializer(world)
    #     return serializer.data

    def get_categories(self, obj):
        article = Article.objects.get(pk=obj.id)
        categories = article.category_set.all()
        serializer = CategorySerializer(categories, many=True)
        return serializer.data


    class Meta:
        model = Article
        fields = ['id', 'title', 'body', 'world_id', 'categories']
