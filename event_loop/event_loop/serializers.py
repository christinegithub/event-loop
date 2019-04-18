from rest_framework import serializers
from event_loop.models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'title',
            'description',
            'date',
        )
        model = Event
