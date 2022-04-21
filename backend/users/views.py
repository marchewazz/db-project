from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from passlib.hash import django_pbkdf2_sha256 as hasher

import json
from pymongo import MongoClient
import environ
from bson.json_util import dumps
import datetime

@csrf_exempt
def register(request):
    env = environ.Env()
    environ.Env.read_env()
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
                "accountPass": hasher.hash(userData['accountPassword']),
            })
        else:
            return JsonResponse({"message": "Your email already exists!"})
        return JsonResponse({"message": dumps(list(collection.find({})), indent=2)})
    except ConnectionError:
        return JsonResponse({"message": "Database problem!"})

@csrf_exempt
def login(request):
    return JsonResponse({"message": "y"})

