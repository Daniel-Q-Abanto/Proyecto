# Generated by Django 5.0.5 on 2024-06-28 03:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_producto_imagen'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='imagen',
            field=models.URLField(blank=True, max_length=255, null=True),
        ),
    ]
