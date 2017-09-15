from rest_framework import serializers
from user.models import Account, Picture
from construct.models import World, Category
from construct.serializers import CategorySerializer, WorldSerializer
from articles.models import Article


class PictureSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(queryset=Account.objects)
    
    class Meta:
        model = Picture
        fields = ['id', 'path', 'instance_type', 'instance_id', 'owner']


class AccountSerializer(serializers.ModelSerializer):
    pictures = serializers.SerializerMethodField('add_pictures')
    worlds = serializers.SerializerMethodField('add_worlds')

    def add_worlds(self, obj):
        worlds = World.objects.filter(author=obj.id)
        serializer = WorldSerializer(worlds, many=True)
        return serializer.data

    def add_pictures(self, obj):
        pictures = Picture.objects.filter(owner=obj.id)
        serializer = PictureSerializer(pictures, many=True)
        return serializer.data

    class Meta:
        model = Account
        fields = [
            'id',
            'email',
            'username',
            'worlds',
            'pictures',
            'is_constructor',
            'is_betaconstructor',
            'is_author',
            'is_redactor',
            'is_moderator',
            'is_admin',
            'created_at',
            'updated_at'
        ]
