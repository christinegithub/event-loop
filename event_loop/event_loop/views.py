from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.conf import settings
from event_loop.forms import LoginForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm

from event_loop.models import Location, Event, Keyword, Profile

def home_page(request):
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
            return HttpResponseRedirect('/home/')
    else:
        form = UserCreationForm()
    response = render(request, 'signup.html', {'form': form})
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

    form = LoginForm()
    response = render(request, 'login.html', {'form': form})
    return HttpResponse(response)