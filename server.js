const express = require("express");
const morgan = require("morgan");
const routes = require("./routes");
const bodyParser = require("body-parser");

const app = express();
app.use(morgan("short"));
app.use(bodyParser.json());
app.use(bodyParser.raw());

routes(app);

app.listen(5500, () => {
  console.log("App is running on port 5500");
});
