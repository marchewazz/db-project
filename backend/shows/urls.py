from django.urls import path

from . import views

urlpatterns = [
    path('getall', views.getAll, name='getall'),
    path('getone', views.getOne, name='getone'),
    path('getseason', views.getSeason, name='getseason'),
    path('getepisode', views.getEpisode, name='getepisode'),
]
