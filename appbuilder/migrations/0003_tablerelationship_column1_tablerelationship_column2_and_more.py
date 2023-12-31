# Generated by Django 4.1.10 on 2023-09-10 11:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appbuilder', '0002_tablerelationship'),
    ]

    operations = [
        migrations.AddField(
            model_name='tablerelationship',
            name='column1',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AddField(
            model_name='tablerelationship',
            name='column2',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='tablerelationship',
            name='relationship_type',
            field=models.CharField(choices=[('M2M', 'Many to Many'), ('O2O', 'One to One'), ('FK', 'Foreign Key')], default='', max_length=3),
        ),
        migrations.AlterField(
            model_name='tablerelationship',
            name='table1',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='tablerelationship',
            name='table2',
            field=models.CharField(default='', max_length=200),
        ),
    ]
