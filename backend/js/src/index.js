var express = require('express');
var app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();

async function updateExpired() {

    function doesDateExpired(date) {
        if (date > new Date()) return false
        else return true
    }

    const client = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    await client.connect(err => {
        if (err) throw err;
        const collection = client.db("app").collection("users");
        collection.find({})
        .toArray(function (err, result) {
            if (err) throw err;
            result.forEach(user => {
                user.tokens.forEach(token => {
                    if (doesDateExpired(token.expires)) {
                        collection.updateMany({}, {
                            "$pull": {
                                "tokens": {
                                    "token": token.token
                                }
                            }
                        })
                    }
                })
                user.loans.forEach(loan => {
                    if (doesDateExpired(loan.loanEndDate)) {
                        console.log(loan.loanID)
                        collection.updateOne({ "loans.loanID": loan.loanID }, {
                            "$set": {
                                "loans.$.state": "expired"
                            }
                        })
                    }
                })
            });
        })
    });
}


app.listen(3000, () => {
    setInterval(() => {
        console.log(`fsajh`);
        updateExpired()
    }, 1000);
})