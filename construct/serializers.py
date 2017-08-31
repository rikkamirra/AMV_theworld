from rest_framework import serializers
from user.models import Account
from construct.models import World, Category
from articles.models import Article


class WorldSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=Account.objects)
    categories = serializers.SerializerMethodField('add_root_categories')

    def add_root_categories(self, obj):
        categories = Category.objects.filter(world_id=obj.id, parent_id=0)
        serializer = CategorySerializer(categories, many=True)
        return serializer.data


    class Meta:
        model = World
        fields = ['id', 'name', 'author', 'categories', 'picture']


class CategorySerializer(serializers.ModelSerializer):
    # articles = serializers.PrimaryKeyRelatedField(many=True, queryset=Article.objects)

    class Meta:
        model = Category
        fields = ['id', 'name', 'parent_id', 'world']
