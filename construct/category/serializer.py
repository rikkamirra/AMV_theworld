from rest_framework import serializers
from .model import Category
from articles.article.model import Article


class CategorySerializer(serializers.ModelSerializer):
    articles = serializers.PrimaryKeyRelatedField(many=True, queryset=Article.objects)

    class Meta:
        model = Category
        fields = ['id', 'name', 'parent_id', 'world', 'articles']
