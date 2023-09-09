# Generated by Django 4.1.10 on 2023-09-05 12:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('appbuilder', '0002_importedtable'),
    ]

    operations = [
        migrations.CreateModel(
            name='DynamicTable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('table_name', models.CharField(max_length=255)),
                ('primary_key', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='DynamicTableColumn',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('column_name', models.CharField(max_length=255)),
                ('data_type', models.CharField(max_length=50)),
                ('unique', models.BooleanField(default=False)),
                ('label', models.CharField(blank=True, max_length=255, null=True)),
                ('dynamic_table', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appbuilder.dynamictable')),
            ],
        ),
    ]
