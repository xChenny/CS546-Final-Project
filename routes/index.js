// Routers
const auth = require("./auth");
const create = require("./create");

const routes = app => {
  app.use("/login", auth);
  app.use("/create", create);
  app.use("*", (req, res) => {
    res.status(404).send("Page Not Found!");
  });
};

module.exports = routes;
