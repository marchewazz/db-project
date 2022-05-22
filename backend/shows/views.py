from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

import environ
import requests
import json
from bson.json_util import dumps


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

@csrf_exempt
def getSeason(request):
    showData = json.loads(request.body)
    print(showData)
    response = requests.post(f"{env('API_URL')}&t={showData['showID']}&Season={showData['seasonNumber']}")

    return JsonResponse({"season": dumps(json.loads(response.content), indent=2)})

@csrf_exempt
def getEpisode(request):
    showData = json.loads(request.body)
    print(showData)
    response = requests.post(f"{env('API_URL')}&t={showData['showID']}&Season={showData['seasonNumber']}&Episode={showData['episodeNumber']}")

    return JsonResponse({"episode": dumps(json.loads(response.content), indent=2)})