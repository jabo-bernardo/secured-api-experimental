/* NPM Packages */
const fs = require("fs");
const path = require("path");
const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

/* Log Stream */
const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"));

/* Express Instance */
const app = express();

/* Middlewares */
const requestValidator = require("./middlewares/requestValidator");

/* Express Configs */
app.use(morgan("dev", { stream: accessLogStream }));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(requestValidator);

/* Express Routes */
// Index
app.use("/", require("./routes/index"));

/* Server Port */
const PORT = process.env.PORT || 80;



app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
