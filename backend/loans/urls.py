from django.urls import path

from . import views

urlpatterns = [
    path('loan', views.loan, name='loan'),
]
