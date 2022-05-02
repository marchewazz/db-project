import json
from bson.json_util import dumps

import requests
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import environ

env = environ.Env()
environ.Env.read_env()

@csrf_exempt
def getAll(request):
    print("TO WRITE")

@csrf_exempt
def getOne(request):
    showID = json.loads(request.body)["showID"]
    response = requests.post(f"{env('API_URL')}&i={showID}&plot=full")

    return JsonResponse({"show": dumps(json.loads(response.content), indent=2)})
