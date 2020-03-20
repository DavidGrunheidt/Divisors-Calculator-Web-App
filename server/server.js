const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/divisors', (req, res) => {
  let reqNumber = parseInt(req.query.number)
  let isPrime = false
  let divisors = []

  if (isConnectedToMongo()) {
    let collectionName = 'numbers_divisors'
    
    findDocuments(collectionName, {'reqNumber': reqNumber}, (docs) => { 
      if (docs.length > 0) {
        divisors = docs[0].divisors
      } else {
        divisors = calculateDivisors(reqNumber)
        insertDocuments([{reqNumber, divisors}], collectionName)
      }
      isPrime = divisors.length <= 2
      res.send({ express: {reqNumber, divisors, isPrime} });
    })
  } else {
    divisors = calculateDivisors(reqNumber)
    isPrime = divisors.length <= 2
    res.send({ express: {reqNumber, divisors, isPrime} });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

function calculateDivisors(number) {
  let divisors = [1]
  for (var i = 2; i < parseInt(number/2); i++) {
    if (number % i == 0) {
      divisors.push(i)
    }
  }
  divisors.push(number)
  return divisors
}

const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const uri = "mongodb+srv://DavidOrdine:LB4lQNrUeiXuHwuZ@cluster0-3rpcd.mongodb.net/test?retryWrites=true&w=majority"
const dbName = 'desafiobridge';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
client.connect(err => { assert.equal(null, err)});

function isConnectedToMongo() {
  return true
}

const findDocuments = function(collectionName, filter, callback) {
  client.db(dbName).collection(collectionName).find(filter).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found "+docs.length+" records that matches filter: "+JSON.stringify(filter));
    callback(docs);
  });
}

const insertDocuments = function(docs, collectionName) {
  client.db(dbName).collection(collectionName).insertMany(docs, function(err, result) {
    assert.equal(err, null);
    assert.equal(docs.length, result.result.n);
    assert.equal(docs.length, result.ops.length);
    console.log("Inserted "+docs.length+" documents into the collection");
  });
}