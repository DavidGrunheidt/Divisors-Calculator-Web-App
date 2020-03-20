const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const uri = "mongodb+srv://DavidOrdine:LB4lQNrUeiXuHwuZ@cluster0-3rpcd.mongodb.net/test?retryWrites=true&w=majority"
const dbName = 'desafiobridge';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

client.connect(err => { assert.equal(null, err)});

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

function isConnected() {
  return true
}

exports.findDocuments = findDocuments
exports.insertDocuments = insertDocuments
exports.isConnected = isConnected
