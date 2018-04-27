const uuid = require("uuid/v4");
const { users } = require("./mongoCollection");
const cn = require("./mongoConnection");
const bcrypt = require("bcrypt");

const createUser = async (username, password) => {
  // Valiadate arguments
  if (!username || !password) throw "Missing arguments";
  if (typeof username !== "string" || typeof password !== "string")
    throw "Invalid argument type(s)";

  // Check for existing user
  const collection = await users();
  const result = await collection.findOne({ username });
  if (result !== null) throw "User already exists!";

  // Generate document
  const _id = uuid();
  const hashPassword = await bcrypt.hash(password, 10);
  const doc = {
    _id,
    username,
    hPass: hashPassword
  };

  // Insert doc
  const info = await collection.insertOne(doc);
  if (info.result.ok !== 1) throw "Could not add user!";

  return doc;
};

const validateUser = async (username, password) => {
  // Valiadate arguments
  if (!username || !password) throw "Missing arguments";
  if (typeof username !== "string" || typeof password !== "string")
    throw "Invalid argument type(s)";

  // Fetch user info
  const collection = await users();
  const result = await collection.findOne({ username });
  if (result === null) throw "User doesnt exist!";

  const valid = await bcrypt.compare(password, result.hPass);
  return valid;
};

const main = async () => {
  console.log(
    await createUser("testUser", "password").catch(e => console.log(e))
  );
};

main();

module.exports = {
  createUser,
  validateUser
}