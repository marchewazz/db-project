from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from pymongo import MongoClient
import environ
from bson.json_util import dumps

@csrf_exempt
def register(request):
    env = environ.Env()
    environ.Env.read_env()
    print(env('MONGO_URL'))
    try:
        client = MongoClient(env('MONGO_URL'))
    except ConnectionError:
        return JsonResponse({"message": "Database problem!"})
    else:
        db = client["app"]
        col = db["users"]
        return JsonResponse({"message": dumps(list(col.find({})), indent=2)})
@csrf_exempt
def login(request):
    return JsonResponse({"message": "y"})

