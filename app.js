const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(express.static('./ui/build'))

// Create routers/routes
routes(app);

app.listen(5500, () => {
  console.log("App is running on port 5500");
});
