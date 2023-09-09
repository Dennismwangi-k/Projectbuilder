from django.db import models
from django.contrib.auth.models import AbstractUser
# models.py

from django.db import models

class UploadedFile(models.Model):
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='uploads/')


# Create your models here.
class User(AbstractUser):
    name = models.CharField(max_length=200, null=False)
    username = models.CharField(max_length=200, unique=True, null=False)
    email = models.EmailField(unique=True, null=False) 


class ImportedTable(models.Model):
    # Define fields that match the columns in your imported database
    field1 = models.CharField(max_length=100)
    field2 = models.IntegerField()
    # ... other fields

    class Meta:
        verbose_name_plural = "Imported Tables"

# Create Dynamictable here
class DynamicTable(models.Model):
    table_name = models.CharField(max_length=255, unique=True)


