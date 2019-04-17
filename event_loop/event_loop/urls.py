"""event_loop URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from event_loop import views

from django.conf.urls import url, include
from event_loop.models import Event
from rest_framework import serializers, viewsets, routers

from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path

urlpatterns = [
]


# Serializers define the API representation.
class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'title', 'description', 'date')


# ViewSets define the view behavior.
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


# Routers provide a way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'events', EventViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

#path('admin/', admin.site.urls),
#path('', views.root),
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='frontend/index.html')),
    path('home/', views.home_page, name='home'),
    path('events/<int:id>/', views.event_show, name='event_show'),
    path('login/', views.login_view, name="login"),
    path('signup/', views.signup, name="signup"),
    path('logout/', views.logout_view, name='logout'),
    path('profile/', views.profile, name='profile'),
    path('profiles/create', views.profile_create, name="profile_create"),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
