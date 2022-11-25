const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const sendRoutes = require("./routes/sendRoutes");
const app = express();
// middleware
app.use(bodyParser.json());
app.use(cors());
sendRoutes(app);

const PORT = 4000;
app.listen(PORT);
