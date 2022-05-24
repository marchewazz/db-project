from django.urls import path

from . import views

urlpatterns = [
    path('getuserdata', views.getUserData, name='getUserData'),
    path('sendinvitation', views.sendInvitation, name='sendInvitation'),
    path('cancelinvitation', views.cancelInvitation, name='cancelInvitation'),
    path('answerinvitation', views.answerInvitation, name='answerInvitation'),
    path('deletefriend', views.deleteFriend, name='deleteFriend'),
    path('compareloanswithfriend', views.compareLoansWithFriend, name='compareloanswithfriend'),
]
