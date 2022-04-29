from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from passlib.hash import django_pbkdf2_sha256 as hasher

import json
from bson.json_util import dumps
from pymongo import MongoClient
import environ
import random
import datetime
from dateutil.relativedelta import *

env = environ.Env()
environ.Env.read_env()

@csrf_exempt
def register(request):
    userData = json.loads(request.body)
    print(userData)
    try:
        client = MongoClient(env('MONGO_URL'))
        db = client["app"]
        collection = db["users"]

        accountsWithPassedEmail = list(collection.find({"accountEmail": userData['accountEmail']}))
        if not accountsWithPassedEmail:
            now = datetime.datetime.now()
            collection.insert_one({
                "accountEmail": userData['accountEmail'],
                "accountFirstName": userData['accountFirstName'],
                "accountLastName": userData['accountLastName'],
                "accountCreateDate": now,
                "accountLastLoginData": now,
                "accountPassword": hasher.hash(userData['accountPassword']),
                "tokens": []
            })
        else:
            return JsonResponse({"message": "Your email already exists!"})
        return JsonResponse({"message": "Registered!"})
    except ConnectionError:
        return JsonResponse({"message": "Database problem!"})

@csrf_exempt
def login(request):
    def randomWord(length):
        letters = "1234567890abcdefghijklmnoprstuwyxzABCDEFGHIJKLMNOPRSTUWYXZ!@#$%^&*()_-+="
        return ''.join(random.choice(letters) for i in range(length))

    try:
        client = MongoClient(env('MONGO_URL'))

        db = client["app"]
        collection = db["users"]

        userData = json.loads(request.body)

        accountsWithPassedEmail = collection.find({"accountEmail": userData['accountEmail']})
        accountsWithPassedEmail = list(accountsWithPassedEmail)
        if not accountsWithPassedEmail:
            client.close()
            return JsonResponse({"message": "No matching email!"})
        else:
            password = accountsWithPassedEmail[0]['accountPassword']

            if hasher.verify(userData['accountPassword'], password):
                while True:
                    token = randomWord(32)
                    if len(list(collection.find({"tokens.token": token}))) == 0: break
                dateNow = {"$set": {"accountLastLoginData": datetime.datetime.now()}}
                pushToken = {"$push": {"tokens": {
                    "token": token,
                    "expires": datetime.datetime.now() + relativedelta(months=1)
                }}}
                collection.update_one({"_id": accountsWithPassedEmail[0]['_id']}, dateNow)
                collection.update_one({"_id": accountsWithPassedEmail[0]['_id']}, pushToken)
                client.close()
                return JsonResponse({"message": "Valid data!", "token": token})
            else:
                client.close()
                return JsonResponse({"message": "Wrong password!"})
    except ConnectionError:
        return JsonResponse({"message": "Database problem!"})

@csrf_exempt
def getUserData(request):
    try:
        client = MongoClient(env('MONGO_URL'))

        db = client["app"]
        collection = db["users"]

        token = json.loads(request.body)["token"]
        print(token)
        userWithToken = list(collection.find({"tokens.token": token}))

        return JsonResponse({"userData": dumps(userWithToken, indent=2)})
    except ConnectionError:
        return JsonResponse({"message": "Database problem!"})