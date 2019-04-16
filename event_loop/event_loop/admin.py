from django.contrib import admin
from event_loop.models import Location, Event, Keyword, Profile

admin.site.register(Location)
admin.site.register(Event)
admin.site.register(Keyword)
admin.site.register(Profile)
