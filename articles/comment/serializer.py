from rest_framework import serializers
from .model import Comment

from user.models import Account
from articles.article.model import Article


class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    article_title = serializers.SerializerMethodField()
    author = serializers.PrimaryKeyRelatedField(queryset=Account.objects)
    article = serializers.PrimaryKeyRelatedField(queryset=Article.objects)

    def get_author_name(self, obj):
        return obj.author.username

    def get_article_title(self, obj):
        return obj.article.title

    class Meta:
        model = Comment
        fields = [
            'id',
            'article',
            'article_title',
            'author',
            'author_name',
            'text',
            'created_at'
        ]
