from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient

import json
import random
import environ
import datetime
from dateutil.relativedelta import *

env = environ.Env()
environ.Env.read_env()

@csrf_exempt
def loan(request):
    loanData = json.loads(request.body)

    try:
        client = MongoClient(env('MONGO_URL'))
        db = client["app"]
        collection = db["users"]

        with client.start_session() as session:
            with session.start_transaction():
                print(loanData)
                account = list(collection.find({"accountNick": loanData["accountNick"]}, session=session))[0]
                if account["balance"] - loanData["price"] < 0:
                    session.abort_transaction()
                    return JsonResponse({"message": "You don't have enough money"})
                else:
                    def randomWord(length):
                        letters = "1234567890abcdefghijklmnoprstuwyxzABCDEFGHIJKLMNOPRSTUWYXZ!@#$%^&*()_-+="
                        return ''.join(random.choice(letters) for i in range(length))

                    while True:
                        loadID = randomWord(10)
                        if not collection.find_one({"loans.loanID": loadID}): break

                    if loanData["duration"] == "month":
                        loanEndDate = datetime.datetime.now() + relativedelta(months=1)
                    if loanData["duration"] == "week":
                        loanEndDate = datetime.datetime.now() + relativedelta(weeks=1)

                    collection.update_one({"accountNick": loanData["accountNick"]},
                                          {"$set": {"balance": account["balance"] - loanData["price"]}},
                                          session=session)
                    collection.update_one({"accountNick": loanData["accountNick"]},
                                          {"$push": {"loans": {
                                              "loadID": loadID,
                                              "showID": loanData["showID"],
                                              "loanStartDate": datetime.datetime.now(),
                                              "loanEndDate": loanEndDate,
                                              "state": "active"
                                          }}},
                                          session=session)
                    session.commit_transaction()
                    return JsonResponse({"message": "Loaned!"})
    except ConnectionError:
        return JsonResponse({"message": "Database problem!"})

