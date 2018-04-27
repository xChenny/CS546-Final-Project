const express = require("express");
const morgan = require("morgan");
const routes = require("./routes");

const app = express();
app.use(morgan('short'))

routes(app);

app.listen(5500, () => {
  console.log("App is running on port 5500");
});
