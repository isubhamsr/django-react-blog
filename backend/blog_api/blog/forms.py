from django import forms
from blog.models import Article

class ArticleForm(forms.ModelForm): 
  
    class Meta: 
        model = Article 
        fields = ['article_title','article_description', 'article_image'] 