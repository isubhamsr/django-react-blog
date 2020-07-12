from django.contrib import admin
from django.urls import path, include
from blog import views

urlpatterns = [
    path('allpost/', views.allpost, name='allpost'),
    path('addarticle/', views.addArticle, name='addarticle'),
    path('update/<int:id>/', views.update_article, name='update'),
    path('post/<int:id>/', views.articleDetails, name='articleDetails'),
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
]
