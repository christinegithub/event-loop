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
from event_loop.serializers import EventSerializer, KeywordSerializer

def root(request):
    return HttpResponseRedirect('/home')

class ListEvent(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class DetailEvent(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class ListKeyword(generics.ListCreateAPIView):
    queryset = Keyword.objects.all()
    serializer_class = KeywordSerializer

def home_page(request):

    bundle_type = 'medium'
    date = '2019-04-18'
    limit = 9999
    offset = 0
    status = 'ongoing'
    event_response = requests.get(f"https://www.blogto.com/api/v2/events/?bundle_type={bundle_type}&date={date}&limit={limit}&offset={offset}&status={status}")

    event_body = json.loads(event_response.content)

    GOOGLE_MAPS_KEY = os.environ.get("GOOGLE_MAPS_KEY")

# `    # for event in event_body["results"]:
#     #     each_event = requests.get(f"https://www.blogto.com/api/v2/events/{event['id']}")
#     #     try:
#     #         Event.objects.get_or_create(
#     #             title = event["title"],
#     #             description = event["description_stripped"],
#     #             date = date,
#     #             image_url = event["image_url"] + "?width=120&height=120",
#     #             start_time = event["start_time"],
#     #             end_time = event["end_time"],
#     #             blogto_id = event["id"])
#     #     except Event.MultipleObjectsReturned:
#              print("Duplicate event Id: " + str(event["id"]))`

    for event in event_body["results"]:
        # each_event = requests.get(f"https://www.blogto.com/api/v2/events/{event['id']}")
        try:
            Event.objects.get_or_create(
                title = event["title"],
                description = event["description_stripped"],
                date = date,
                image_url = event["image_url"] + "?width=600&height=600",
                start_time = event["start_time"],
                # venue = event["venue_name"],
                end_time = event["end_time"],
                blogto_id = event["id"],
                venue_name = event["venue_name"])
        except Event.MultipleObjectsReturned:
            print("Duplicate event Id: " + str(event["id"]))

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
    context = {'events': events, 'GOOGLE_MAPS_KEY': GOOGLE_MAPS_KEY}
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
