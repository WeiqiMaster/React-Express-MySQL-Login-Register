require('dotenv').config()
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const redis = require('redis')
var session = require('express-session')

let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
    host: process.env.REDIS_HOST || "redis",
    port: 6379
})

redisClient.on('error', (err) =>
  console.log(`Fail to connect to redis. ${err}`)
)
redisClient.on('connect', () => console.log('Successfully connect to redis'))

app.use(
  cors({
    // origin: "http://172.19.0.2:3001", //"http://localhost:80", //"http://localhost:3001",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SECRET || "default secret",
    cookie: {
      domain: 'localhost',
      secure: false,
      maxAge: 60 * 1000 // expire in 1 min for testing purpose
    },
    resave: true,
    saveUninitialized: true,
  })
)

// database
const db = require("./models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.sendFile("./frontend/login.html");
});

// routes
require("./routes/auth.routes")(app);


// set port, listen for requests
const PORT = process.env.NODE_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
