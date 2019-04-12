from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render

from event_loop.models import Location, Event, Keyword, Profile

def home_page(request):
    events = Event.objects.all()
    context = {'events': events}
    response = render(request, 'home_page.html', context)
    return HttpResponse(response)
