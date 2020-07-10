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