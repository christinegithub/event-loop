from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, reverse, redirect
from django.conf import settings
from event_loop.forms import LoginForm, ProfileForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods

import json
import requests

from event_loop.models import Location, Event, Keyword, Profile

def home_page(request):
    bundle_type = 'medium'
    date = '2019-04-11'
    limit = 9999
    offset = 0
    status = 'ongoing'
    event_response = requests.get(f"https://www.blogto.com/api/v2/events/?bundle_type={bundle_type}&date={date}&limit={limit}&offset={offset}&status={status}")

    event_body = json.loads(event_response.content)

    for event in event_body["results"]:
        each_event = requests.get(f"https://www.blogto.com/api/v2/events/{event['id']}")
        each_event_body = json.loads(each_event.content)
        # print(event["title"])
        if each_event_body["location"]:
            event_location = Location.objects.create(address = each_event_body["address"], province = each_event_body["province"], city = each_event_body["city"], longitude = each_event_body["location"]["longitude"], latitude = each_event_body["location"]["latitude"])
        else:
            event_location = None
        new_event = Event.objects.create(title = event["title"], description = event["description_stripped"], date = date, start_time = event["start_time"], end_time = event["end_time"], blogto_id = event["id"])


    events = Event.objects.all()
    context = {'events': events}
    response = render(request, 'home_page.html', context)
    return HttpResponse(response)

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

