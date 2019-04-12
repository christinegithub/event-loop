from django.contrib.auth.models import User
from django.db import models

class Location(models.Model):
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    province = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitute = models.FloatField()

class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image_url = models.URLField(max_length=255, null=True)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_multiple_days = models.BooleanField()
    event_url = models.URLField(max_length=255, null=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='events')

class Keyword(models.Model):
    word = models.CharField(max_length=255, unique=True)
    events = models.ManyToManyField(Event, related_name='keywords')

class Profile(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    tags = models.ManyToManyField(Keyword, related_name='profiles')
