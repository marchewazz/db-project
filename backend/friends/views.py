from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from bson.json_util import dumps
from pymongo import MongoClient
import environ
import json
import datetime

env = environ.Env()
environ.Env.read_env()

@csrf_exempt
def getUserData(request):
    try:
        client = MongoClient(env('MONGO_URL'))

        db = client["app"]
        collection = db["users"]

        accountID = json.loads(request.body)["accountID"]

        userWithAccountID = list(collection.find({"accountID": accountID}))

        if userWithAccountID:
            userWithAccountID = userWithAccountID[0]
            del userWithAccountID["tokens"]
            del userWithAccountID["balance"]
            del userWithAccountID["accountPassword"]

        return JsonResponse({"userData": dumps(userWithAccountID, indent=2)})
    except ConnectionError:
        return JsonResponse({"message": "Database problem!"})


@csrf_exempt
def sendInvitation(request):
    try:
        client = MongoClient(env('MONGO_URL'))

        db = client["app"]
        collection = db["users"]

        invitationData = json.loads(request.body)

        with client.start_session() as session:
            with session.start_transaction():
                collection.update_one({"accountID": invitationData["receiverID"]},
                                      {"$push": {"invitations": {
                                        "senderID": invitationData["senderID"],
                                        "invitationDate": datetime.datetime.now(),
                                      }}},
                                      session=session)

                session.commit_transaction()

        return JsonResponse({"message": "Invitation send!"})
    except ConnectionError:

        return JsonResponse({"message": "Database problem!"})


@csrf_exempt
def cancelInvitation(request):
    try:
        client = MongoClient(env('MONGO_URL'))

        db = client["app"]
        collection = db["users"]

        invitationData = json.loads(request.body)

        with client.start_session() as session:
            with session.start_transaction():
                collection.update_one({"accountID": invitationData["receiverID"]},
                                      {"$pull": {"invitations": {
                                        "senderID": invitationData["senderID"]
                                      }}},
                                      session=session)

                session.commit_transaction()

        return JsonResponse({"message": "Invitation canceled!"})
    except ConnectionError:
        return JsonResponse({"message": "Database problem!"})


@csrf_exempt
def answerInvitation(request):
    try:

        client = MongoClient(env('MONGO_URL'))

        db = client["app"]
        collection = db["users"]

        invitationData = json.loads(request.body)

        with client.start_session() as session:
            with session.start_transaction():
                if invitationData['answer'] == "decline":
                    collection.update_one({"accountID": invitationData["receiverID"]},
                                          {"$pull": {"invitations": {
                                              "senderID": invitationData["senderID"]
                                          }}},
                                          session=session)

                    session.commit_transaction()

                    return JsonResponse({"message": "Invitation declined!"})

                if invitationData['answer'] == "accept":
                    collection.update_one({"accountID": invitationData["receiverID"]},
                                          {"$pull": {"invitations": {
                                              "senderID": invitationData["senderID"]
                                          }}},
                                          session=session)
                    collection.update_one({"accountID": invitationData["receiverID"]},
                                          {"$push": {"friends": {
                                              "senderID": invitationData["senderID"],
                                              "addDate": datetime.datetime.now()
                                          }}},
                                          session=session)

                    session.commit_transaction()

                    return JsonResponse({"message": "Friend added!"})

    except ConnectionError:
        return JsonResponse({"message": "Database problem!"})
