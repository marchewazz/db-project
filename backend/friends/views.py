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
                                              "friendID": invitationData["senderID"],
                                              "addDate": datetime.datetime.now()
                                          }}},
                                          session=session)
                    collection.update_one({"accountID": invitationData["senderID"]},
                                          {"$push": {"friends": {
                                              "friendID": invitationData["receiverID"],
                                              "addDate": datetime.datetime.now()
                                          }}},
                                          session=session)

                    session.commit_transaction()

                    return JsonResponse({"message": "Friend added!"})

    except ConnectionError:
        return JsonResponse({"message": "Database problem!"})

@csrf_exempt
def deleteFriend(request):
    try:

        client = MongoClient(env('MONGO_URL'))

        db = client["app"]
        collection = db["users"]

        invitationData = json.loads(request.body)

        with client.start_session() as session:
            with session.start_transaction():
                    collection.update_one({"accountID": invitationData["user1ID"]},
                                          {"$pull": {"friends": {
                                              "friendID": invitationData["user2ID"],
                                          }}},
                                          session=session)
                    collection.update_one({"accountID": invitationData["user2ID"]},
                                          {"$pull": {"friends": {
                                              "friendID": invitationData["user1ID"],
                                          }}},
                                          session=session)

                    session.commit_transaction()

                    return JsonResponse({"message": "Friend deleted!"})

    except ConnectionError:
        return JsonResponse({"message": "Database problem!"})


@csrf_exempt
def compareLoansWithFriend(request):
    try:

        client = MongoClient(env('MONGO_URL'))

        db = client["app"]
        collection = db["users"]

        userData = json.loads(request.body)

        userLoans = list(collection.find({"accountID": userData["userID"]}, {"loans": 1}))[0]['loans']
        friendLoans = list(collection.find({"accountID": userData["friendID"]}, {"loans": 1}))[0]['loans']

        commonLoans = []
        diffrentLoans = []

        for friendLoan in friendLoans:
            for userLoan in userLoans:
                if friendLoan['showID'] == userLoan['showID']:
                    commonLoans.append(userLoan['showID'])
                    break
            else:
                diffrentLoans.append(friendLoan['showID'])

        return JsonResponse({"commonLoans": commonLoans, "diffrentLoans": diffrentLoans})

    except ConnectionError:
        return JsonResponse({"message": "Database problem!"})