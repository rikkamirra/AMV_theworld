from rest_framework import serializers
from user.models import Account
from construct.models import World, Category
from construct.serializers import CategorySerializer, WorldSerializer
from articles.models import Article


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = [
            'id',
            'email',
            'username',
            'is_constructor',
            'is_betaconstructor',
            'is_author',
            'is_redactor',
            'is_moderator',
            'is_admin',
            'created_at',
            'updated_at'
        ]
