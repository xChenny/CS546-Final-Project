const MongoClient = require("mongodb").MongoClient;
const mongoConfig = require("./settings");

let fullMongoUrl = `${mongoConfig.serverUrl}/${mongoConfig.db}`;
let _connection = undefined;
let _db = undefined;

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(fullMongoUrl);
    _db = await _connection.db(mongoConfig.db);
  }
  return _db;
};
