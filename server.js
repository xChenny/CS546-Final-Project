const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const routes = require("./routes");
const bodyParser = require("body-parser");

const app = express();
app.use(morgan("short"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({
    extended: false
}));

routes(app);

app.listen(5500, () => {
    console.log("App is running on port 5500");
});
