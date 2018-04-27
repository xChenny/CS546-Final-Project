const routes = app => {
  app.use("*", (req, res) => {
    res.status(404).send("Page Not Found!");
  });
};

module.exports = routes;
