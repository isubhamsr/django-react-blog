from django.contrib import admin
from django.urls import path, include
from blog import views

urlpatterns = [
    path('allpost/', views.allpost, name='allpost'),
    path('addarticle/', views.addArticle, name='addarticle'),
    path('post/<int:id>/', views.articleDetails, name='articleDetails'),
]
