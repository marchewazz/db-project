from django.urls import path

from . import views

urlpatterns = [
    path('getuserdata', views.getUserData, name='getUserData'),
    path('sendinvitation', views.sendInvitation, name='sendInvitation'),
    path('cancelinvitation', views.cancelInvitation, name='cancelInvitation'),
]
