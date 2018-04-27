const uuid = require("uuid/v4");
const { users } = require("./mongoCollection");
const cn = require("./mongoConnection");
const bcrypt = require("bcrypt");

const createUser = async (username, password) => {
  if (!username || !password) throw "Missing arguments";

  if (typeof username !== "string" || typeof password !== "string")
    throw "Invalid argument type(s)";

  const collection = await users();
  //const result = await collection.findOne({ username });
  //if (result !== null) throw "User already exists!";
  //console.log(result);

  const _id = uuid();
  const hashPassword = await bcrypt.hash(password, 10);

  const doc = {
    _id,
    username,
    hPass: hashPassword
  };

  const info = await collection.insertOne(doc);
  if (info.result.ok !== 1) throw "Could not add user!";

  return doc;
};

const main = async () => {
  console.log(createUser("testUser", "password").catch(e => console.log(e)));
  const connection = await cn();
  await connection.serverConfig.close();
};

main();
