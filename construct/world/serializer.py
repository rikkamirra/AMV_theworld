from rest_framework import serializers
from user.models import Account
from construct.category.model import Category
from construct.category.serializer import CategorySerializer
from articles.article.model import Article
from articles.comment.serializer import CommentSerializer
from articles.comment.model import Comment
from .model import World


class WorldSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=Account.objects)
    categories = serializers.SerializerMethodField('add_root_categories')

    def add_root_categories(self, obj):
        categories = Category.objects.filter(world=obj.id, parent_id=0)
        serializer = CategorySerializer(categories, many=True)
        return serializer.data


    class Meta:
        model = World
        fields = ['id', 'name', 'author', 'categories', 'picture', 'is_private', 'created_at', 'updated_at']
