var Promise = require("bluebird");
const MongoClient = require('mongodb').MongoClient;
var moment = require('moment');
moment().format();

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mongoDelta';
var db;

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to database");
  db = client.db(dbName);
});

const incomingView = function(view) {
  collection.findOne({"userID": view.userID, "$orderby":{ "_id": -1 }})
}

// view: { userID, instanceID, videoID, isAutoplay, progress, totalLength }
const simpleSession = function(view) {
  return new Promise(function(resolve) {
    const collection = db.collection('simpleSession');
    collection.insertOne({
      userID: view.userID,
      sessionUpdateTimestamp: new Date,
      views: [{
        instanceID: view.instanceID,
        videoID: view.videoID,
        isAutoplay: view.isAutoplay,
        playbackPosition: view.progress,
        totalLength: view.totalLength
      }]
    })
  })
}

module.exports.db = db;
module.exports.simpler = simpler;
module.exports.simpleSession = simpleSession;