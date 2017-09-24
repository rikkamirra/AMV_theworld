from rest_framework import serializers
from user.models import Account, Picture, PicturesRelationship
from construct.models import World, Category
from construct.serializers import CategorySerializer, WorldSerializer
from articles.models import Article


class PicturesRelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = PicturesRelationship
        fields = ['instance_id', 'instance_type']


class PictureSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(queryset=Account.objects)
    relationships = serializers.SerializerMethodField('add_relationships')

    def add_relationships(self, obj):
        picture_relationship = PicturesRelationship.objects.filter(picture=obj.id)
        relationship_serializer = PicturesRelationshipSerializer(picture_relationship, many=True)
        return relationship_serializer.data


    class Meta:
        model = Picture
        fields = [
            'id',
            'path',
            'relationships',
            'owner',
            'is_deleted',
            'created_at',
            'updated_at'
        ]


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
