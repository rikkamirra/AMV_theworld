from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.core import serializers
import json
import re


class AccountManager(BaseUserManager):
    def create(self, kwargs):
        if not kwargs.get('email'):
            raise ValueError('Users must have a valid email address.')

        if not kwargs.get('password'):
            raise ValueError('Usre must have a valid password')

        if not kwargs.get('username'):
            raise ValueError('Users must have a valid username.')

        account = self.model(
            email=self.normalize_email(kwargs.get('email')), username=kwargs.get('username')
        )

        role = kwargs.get('role', '')
        setattr(account, role, True)

        account.set_password(kwargs.get('password'))
        account.save()

        return account


    def set_role(self, user_id, role):
        account = self.get(pk=user_id)
        setattr(account, 'is_'+role, True)
        account.save()

    def create_superuser(self, email, password, **kwargs):
        account = self.create_user(email, password, **kwargs)

        account.is_admin = True
        account.save()

        return account


class Account(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=40, unique=True)

    is_constructor = models.BooleanField(default=False)
    is_betaconstructor = models.BooleanField(default=False)
    is_author = models.BooleanField(default=False)
    is_redactor = models.BooleanField(default=False)
    is_moderator = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __unicode__(self):
        return self.email


class PicturesRelationship(models.Model):
    picture = models.ForeignKey('user.Picture')
    instance_type = models.CharField(max_length=16)
    instance_id = models.IntegerField()
    redirect = models.CharField(max_length=255, default="/")


class PictureManager(models.Manager):
    def create(self, **kwargs):
        picture = None;
        if self.model.objects.filter(path=kwargs.get('path')).count() == 0:
            picture = self.model(path=kwargs.get('path'), owner=kwargs.get('owner'))
            picture.save()
        else:
            picture = self.model.objects.get(path=kwargs.get('path'))

        picture_relationship = PicturesRelationship(picture=picture, instance_id=kwargs.get('instance_id', 0), instance_type=kwargs.get('instance_type', 'undefined'), redirect=kwargs.get('redirect', '/'))
        picture_relationship.save()

        return picture

    def update(self, list_images, **kwargs):
        old_relationships = PicturesRelationship.objects.filter(instance_id=kwargs.get('instance_id'), instance_type=kwargs.get('instance_type')).delete()
        for image in list_images:
            self.create(path=image, owner=kwargs.get('owner'), instance_id=kwargs.get('instance_id'), instance_type=kwargs.get('instance_type'), redirect=kwargs.get('redirect', '/'))


class Picture(models.Model):
    path = models.URLField(max_length=255)
    owner = models.ForeignKey(Account, null=True, blank=True, on_delete=models.CASCADE)

    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = PictureManager()
