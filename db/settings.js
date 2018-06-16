const { mLabUser, mLabPass } = require("../config.json");

const mongoConfig = {
  db: "codejs",
  serverUrl: `mongodb://${mLabUser}:${mLabPass}@ds257640.mlab.com:57640`
};

module.exports = mongoConfig;
