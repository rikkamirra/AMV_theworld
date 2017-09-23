from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.core import serializers
import json


class AccountManager(BaseUserManager):
    def create_user(self, **kwargs):
        if not kwargs.get('email'):
            raise ValueError('Users must have a valid email address.')

        if not kwargs.get('password'):
            raise ValueError('Usre must have a valid password')

        if not kwargs.get('username'):
            raise ValueError('Users must have a valid username.')

        account = self.model(
            email=self.normalize_email(kwargs.get('email')), username=kwargs.get('username')
        )

        role = kwargs.get('role')
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


class Picture(models.Model):
    path = models.URLField(max_length=255)
    instance_type = models.CharField(max_length=15, default="article") #article, category, world, account
    instance_id = models.IntegerField()
    owner = models.ForeignKey(Account, null=True, blank=True)

    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
