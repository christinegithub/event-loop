from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.conf import settings
from event_loop.models import Location, Event, Keyword, Profile

def home_page(request):
    events = Event.objects.all()
    context = {'events': events}
    response = render(request, 'home_page.html', context)
    return HttpResponse(response)

def event_show(request, id):
    event = Event.objects.get(pk=id)
    context = {'event': event, 'title':  event.title}
    return render(request, 'event_details.html', context)
