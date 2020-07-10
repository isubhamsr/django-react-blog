from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt
from blog.models import Article
from blog.forms import ArticleForm
import json
import sys

# Create your views here.

def allpost(request):
    try:
        articles = Article.objects.all()
        if len( articles) == 0:
            return JsonResponse({'err':'true', 'message':'Posts Not Found'})
        else:
            data = list(articles.values())
            data = data[::-1] 
            # print(data)
            return JsonResponse({'err':'false', 'message':'All Posts are Fetched', 'data':data})
    except Exception as err:
        errMessage = f"Oops! {sys.exc_info()[1]}"
        # print("Oops!", sys.exc_info()[1], "occurred.")
        return JsonResponse({'err':'true', 'message' : errMessage})


def articleDetails(request, id):
    try:
        # print(id)
        articleDetails = Article.objects.filter(article_id=id)
        if len(articleDetails) == 0:
            return JsonResponse({'err':'true', 'message':'Article Not Found'})
        else:
            # print(articleDetails.values())
            details = list(articleDetails.values())
            return JsonResponse({'err':'false', 'message':'Article Found', 'data':details})
    except Exception as err:
        errMessage = f"Oops! {sys.exc_info()[1]}"
        return JsonResponse({'err':'true', 'message' : errMessage})
    
@csrf_exempt    
def addArticle(request):
    if request.method == 'POST':
        print(request.POST)
        print(request.FILES)
        form = ArticleForm(request.POST, request.FILES)
        # print(form)
        if form.is_valid():
            form.save()
            return JsonResponse({"err":"false", "message":"data added"})
        else:
            return JsonResponse({"err":"true", "message":"data not added"})


@csrf_exempt
def update_article(request, id):            
    if request.method == 'POST':
        try:
            form = ArticleForm(request.POST, request.FILES)
            print(form)
            print(id)
    
            # article_update = Article.objects.get(article_id = id)
            # print(article_update)
            # tasks.test_title = payload['task_title']
            # tasks.test_desc = payload['task_desc']
            # tasks.task_time = payload['task_time']
            # tasks.task_date = payload['task_date']
            # tasks.raw_date_time = payload['raw_date_time']

            # tasks.save() 
            if form.is_valid():
                # form.save()
                update_article = Article.objects.get(article_id = id)
                update_article.article_title = form.cleaned_data['article_title']
                update_article.article_description = form.cleaned_data['article_description']
                update_article.article_image = form.cleaned_data['article_image']
                print(form.cleaned_data['article_image'])
                update_article.save()
                return JsonResponse({"err":"false", "message":"data added"})
            else:
                return JsonResponse({"err":"true", "message":"data not added"})
        except Exception as err:
            errMessage = f"Oops! {sys.exc_info()[1]}"
            return JsonResponse({'err':'true', 'message' : errMessage})
        