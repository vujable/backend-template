const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

app.use('/static', express.static('public'))

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.port;

/* Db connection */

var uri = process.env.mongodburi;

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

/* */

const publicRoutes = require("./routes/publicRoutes")();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    }
}));

app.use(cors());

/*const allowedOrigins = ['*'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));*/

app.use("/api", publicRoutes); //Put public routes here that do not require Authentication
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));