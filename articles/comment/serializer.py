from rest_framework import serializers
from .model import Comment


class CommentSerializer(serializers.ModelSerializer):
    author_id = serializers.SerializerMethodField()
    author_name = serializers.SerializerMethodField()
    article_id = serializers.SerializerMethodField()
    article_title = serializers.SerializerMethodField()

    def get_author_id(seld, obj):
        return obj.author.id

    def get_author_name(self, obj):
        return obj.author.username

    def get_article_id(self, obj):
        return obj.article.id

    def get_article_title(self, obj):
        return obj.article.title

    class Meta:
        model = Comment
        fields = [
            'id',
            'article_id',
            'article_title',
            'author_id',
            'author_name',
            'text',
            'created_at'
        ]
