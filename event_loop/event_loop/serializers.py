from rest_framework import serializers
from event_loop.models import Event, Location, Keyword

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'title',
            'description',
            'image_url',
            'date',
            'start_time',
            'end_time',
            'event_url',
            'blogto_id',
            'venue_name',
            'location',
            'keywords'
        )
        model = Event
        depth = 1

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'address',
            'city',
            'province',
            'latitude',
            'longitude'
        )
        model = Location

class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'word',
            'events'
        )
        model = Keyword
        depth = 1
        # extra_kwargs = {
        #     'events': {'lookup_field': 'word'}
        # }
