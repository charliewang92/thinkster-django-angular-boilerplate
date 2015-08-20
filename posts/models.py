from django.db import models
from authentication.models import Account
# Create your models here.
class Post(models.Model):
    #foreign key to an author, and the a text field
    author = models.ForeignKey(Account)
    content = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.content