from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from account.models import User
import jwt
import bcrypt
import json
import sys

# Create your views here.
@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            params = json.loads(request.body)
            # print(params)
            first_name = params['first_name']
            last_name = params['last_name']
            username = params['username']
            email = params['email']
            phone = params['phone']
            password = params['password']

            # password = bytes(password, encoding='utf-8')
            # hashed_password = bcrypt.hashpw(password, bcrypt.gensalt(rounds=15))

            user = User.objects.filter(email=email)
            print("user")
            print(len(user))
            if len(user) > 1:
                return JsonResponse({'err':'true', 'message' : 'Email Already Taken'})
            else:
                user = User.objects.filter(username=username)
                if len(user) > 1:
                    return JsonResponse({'err':'true', 'message' : 'Username Already Taken'})
                else:
                    password = bytes(password, encoding='utf-8')
                    hashed_password = bcrypt.hashpw(password, bcrypt.gensalt(rounds=15))
                    payload = {"first_name":first_name, "last_name":last_name, "email":email, "phone":phone, "username":username}

                    encoded_jwt = jwt.encode(payload, 'secret', algorithm='HS256')

                    # data = json.dumps(encoded_jwt, default=str)
                    data = encoded_jwt.decode('utf-8')
                    # print(data)
                    user = User(first_name=first_name, last_name=last_name, username=username, email=email, password=hashed_password, phone=phone)
                    user.save()
                    return JsonResponse({'err':'false', 'message':'Sign Up Successful', 'data':data})
        except Exception as err:
            errMessage = f"Oops! {sys.exc_info()[1]}"
            return JsonResponse({'err':'true', 'message' : errMessage})            

@csrf_exempt
def signin(request):
    try:
        pass
    except Exception as err:
        errMessage = f"Oops! {sys.exc_info()[1]}"
        return JsonResponse({'err':'true', 'message' : errMessage}) 