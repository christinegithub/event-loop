# Generated by Django 2.2 on 2019-04-24 21:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event_loop', '0017_auto_20190423_2350'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='end_time',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='event',
            name='start_time',
            field=models.CharField(max_length=255),
        ),
    ]
