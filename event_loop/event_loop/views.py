from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, reverse, redirect
from django.conf import settings
from event_loop.forms import LoginForm, ProfileForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from django.forms.models import model_to_dict
from django.core import serializers
from event_loop.models import Event

from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods

import json
import requests
import os

from rest_framework import generics

from event_loop.models import Location, Event, Keyword, Profile
from event_loop.serializers import EventSerializer, LocationSerializer, KeywordSerializer
from event_loop.tasks import get_events
from rake_nltk import Rake

from datetime import date


def root(request):
    return HttpResponseRedirect('/home')

class ListEvent(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class DetailEvent(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class ListLocation(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class DetailLocation(generics.RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class ListKeyword(generics.ListCreateAPIView):
    queryset = Keyword.objects.all()
    serializer_class = KeywordSerializer

class DetailKeyword(generics.RetrieveUpdateDestroyAPIView):
    queryset = Keyword.objects.all()
    serializer_class = KeywordSerializer

def home_page(request):
    # get the json with events for a specific date
    bundle_type = 'medium'
    today = date.today().strftime('%Y-%m-%d')
    limit = 9999
    offset = 0
    status = 'ongoing'
    event_list_json = requests.get(f"https://www.blogto.com/api/v2/events/?bundle_type={bundle_type}&date={today}&limit={limit}&offset={offset}&status={status}")

    # convert json received into a python dictionary
    event_list = json.loads(event_list_json.content)
    print(event_list)

    r = Rake(min_length=1, max_length=1)

    for event_summary in event_list["results"]:
        event_full_json = requests.get(f"https://www.blogto.com/api/v2/events/{event_summary['id']}")
        event_full = json.loads(event_full_json.content)
        print(event_full['title'])

        r.extract_keywords_from_text(event_full["title"])
        word_list = r.get_ranked_phrases()

        try:
            if event_full["location"]:
                location, location_created = Location.objects.get_or_create(
                latitude = event_full["location"]["latitude"],
                longitude = event_full["location"]["longitude"],
                defaults = {
                    'address': event_full['address'],
                    'city': event_full['city'],
                    'province': event_full['province']
                }
                )
            else:
                location, location_created = Location.objects.get_or_create(
                latitude = None,
                longitude = None,
                city = event_full['city'],
                defaults = {
                    'address': event_full['address'],
                    'province': event_full['province']
                }
                )
        except Event.MultipleObjectsReturned:
                print("Duplicate location: " + str(event_full["location"]))
        try:
            event_object, event_created = Event.objects.get_or_create(
            blogto_id = event_full["id"],
            date = today,
            defaults = {
                'title': event_full["title"],
                'description': event_full["description_stripped"],
                'image_url': event_full["image_url"],
                'start_time': event_summary["start_time"],
                'end_time': event_summary["end_time"],
                'venue_name': event_full["venue_name"],
                'location': location
            }
            )
            # looping through events, creating a list of keywords, looping through keywords to create keyword object for each
            # only if word has not been previously created
            for word in word_list:
                try:
                    kword, kword_created = Keyword.objects.get_or_create(
                        word = word
                    )
                    event_object.keywords.add(kword)
                    print(word)
                except Keyword.MultipleObjectsReturned:
                    print("Duplicate keyword")
        except Event.MultipleObjectsReturned:
            print("Duplicate event Id: " + str(event_full["id"]))

    events = Event.objects.all().order_by("id").reverse()
    paginator = Paginator(events, 10) # Shows only 10 records per page

    page = request.GET.get('page')
    try:
        events = paginator.page(page)
    except PageNotAnInteger:
    # If page is not an integer, deliver first page.
        events = paginator.page(1)
    except EmptyPage:
    # If page is out of range (e.g. 7777), deliver last page of results.
        events = paginator.page(paginator.num_pages)
    context = {'events': events}
    response = render(request, 'home_page.html', context)
    return HttpResponse(response)



def events(request):
    events = Event.objects.all().order_by("id").reverse()
    data = list(events.values())
    return JsonResponse(data, safe=False)

def signup(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect('/home/')
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect(reverse('profile'))
    else:
        form = UserCreationForm()

    response = render(request, 'signup.html', {'form': form})
    return HttpResponse(response)

@login_required
def profile(request):
    context = {'title': 'Profile'}
    if not Profile.exists_for_user(request.user):
        form = ProfileForm()
        context['form'] = form
    response = render(request, 'profile.html', context)
    return HttpResponse(response)


@login_required
def profile_create(request):
    form = ProfileForm(request.POST)
    form.instance.user = request.user
    if form.is_valid():
        form.save()
        return HttpResponseRedirect('/profile/')
    else:
        context = {'title': 'Profile', 'form': form}
        response = render(request, 'profile.html', context)
        return HttpResponse(response)



def login_view(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect('/home/')
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            pw = form.cleaned_data['password']
            user = authenticate(username=username, password=pw)
            if user is not None:
                login(request, user)
                return HttpResponseRedirect('/home/')
            else:
                form.add_error('username', 'Login failed.')
    else:
        form = LoginForm()

    response = render(request, 'login.html', {'form': form})
    return HttpResponse(response)

def logout_view(request):
    logout(request)
    return HttpResponseRedirect('/home/')

def event_show(request, id):
    event = Event.objects.get(pk=id)
    context = {'event': event, 'title':  event.title}
    return render(request, 'event_details.html', context)
