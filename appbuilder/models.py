

from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    name = models.CharField(max_length=200, null=False)
    username = models.CharField(max_length=200, unique=True, null=False)
    email = models.EmailField(unique=True, null=False) 



