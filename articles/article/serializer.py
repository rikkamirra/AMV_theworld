from rest_framework import serializers

from construct.category.model import Category

from construct.category.serializer import CategorySerializer
from construct.world.serializer import WorldSerializer

from articles.comment.model import Comment
from articles.comment.serializer import CommentSerializer
from articles.article.model import Article


class ArticleSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()
    world = serializers.SerializerMethodField()
    body = serializers.CharField(required=False)
    comments = serializers.SerializerMethodField()

    def get_world(self, obj):
        serializer = WorldSerializer(obj.world)
        return serializer.data;

    def get_categories(self, obj):
        article = Article.objects.get(pk=obj.id)
        categories = article.category_set.all()
        serializer = CategorySerializer(categories, many=True)
        return serializer.data

    def get_comments(self, obj):
        return CommentSerializer(Comment.objects.filter(article_id=obj.id), many=True).data

    class Meta:
        model = Article
        fields = (
            'id',
            'title',
            'categories',
            'world',
            'body',
            'comments',
            'created_at',
            'updated_at'
            )
