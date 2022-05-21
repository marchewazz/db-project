from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from bson.json_util import dumps
from pymongo import MongoClient
import environ
import json
import requests

env = environ.Env()
environ.Env.read_env()

@csrf_exempt
def search(request):
    try:
        client = MongoClient(env('MONGO_URL'))

        db = client["app"]
        collection = db["users"]

        phrase = json.loads(request.body)["phrase"]

        shows = requests.post(f"{env('API_URL')}&s={phrase}")
        users = list(collection.find({"accountNick": {"$regex": phrase, "$options": 'i'}}))

        return JsonResponse({"showsResults": dumps(json.loads(shows.content)), "usersResults": dumps(users, indent=2)})
    except ConnectionError:
        return JsonResponse({"message": "Database problem!"})
