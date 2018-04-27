// Routers
const auth = require("./auth");

const routes = app => {
  app.use("/login", auth);
  app.use("*", (req, res) => {
    res.status(404).send("Page Not Found!");
  });
};

module.exports = routes;
