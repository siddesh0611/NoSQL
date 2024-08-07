const mongodb = require('mongodb');
const MongoCleient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoCleient.connect('mongodb+srv://siddesh:q0BnfXsFaWoRz9Ra@cluster0.9f5ry.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
    .then(client => {
      console.log('Connected');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

const getDb = () => {
  if (_db) {
    return _db
  }
  throw 'No database found'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;