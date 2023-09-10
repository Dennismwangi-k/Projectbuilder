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
    field1 = models.CharField(max_length=100)
    field2 = models.IntegerField()
    class Meta:
        verbose_name_plural = "Imported Tables"

class DynamicTable(models.Model):
    table_name = models.CharField(max_length=255, unique=True)
    

class TableRelationship(models.Model):
    table1 = models.CharField(max_length=200,default='')
    column1 = models.CharField(max_length=200,default='')
    table2 = models.CharField(max_length=200,default='')
    column2 = models.CharField(max_length=200,default='')
    RELATIONSHIP_CHOICES = (
        ('M2M', 'Many to Many'),
        ('O2O', 'One to One'),
        ('FK', 'Foreign Key'),
    )
    relationship_type = models.CharField(choices=RELATIONSHIP_CHOICES, max_length=3,default='')



