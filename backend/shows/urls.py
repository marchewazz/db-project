from django.urls import path

from . import views

urlpatterns = [
    path('getall', views.getAll, name='register'),
    path('getone', views.getOne, name='login'),
]
