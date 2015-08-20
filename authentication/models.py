from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from django.db import models

class AccountManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('Users need valid email address')

        if not kwargs.get('username'):
            raise ValueError('Users need a valid username.')

        account = self.model(
            email = self.normalize_email(email), username=kwargs.get('username')
        )

        account.set_password(password)
        account.save()

        return Account

    def create_superuser(self, email, password, **kwargs):
        account = self.create_user(email, password, **kwargs)

        account.is_admin = True
        account.save()

        return account


# Create your models here.
class Account(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=40, unique=True)

    first_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)
    tagline = models.CharField(max_length=140, blank=True)

    is_admin = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    #overriding the unicode method so that we get their email returned
    def __unicode__(self):
        return self.email
    
    #overriding the user's fullname and short_name
    def get_full_name(self):
    	return ' '.join([self.first_name, self.last_name])
    
    def get_short_name(self):
    	return self.first_name
