/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors"); // Import cors
const dotenv = require("dotenv");

const app = express();
const bodyParser = require("body-parser"); // middleware
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.pswd;
  let secret = process.env.key1;

  const user = {
    username: username,
    password: password,
  };

  jwt.sign(user, secret, (err, token) => {
    console.log(err);
    if (err) {
      const errorStatus = 404; // Example status code
      const errorMessage = "Resource not found";
      console.log(err);
      res.status(errorStatus).send({
        status: errorStatus,
        message: errorMessage,
        error: err,
        timestamp: new Date().toISOString(),
      });
      // res.sendStatus(403);
    } else {
      res.json({
        token: token,
        msg: "Token created",
      });
    }
  });
});

app.post("/posts", verifyToken, (req, res) => {
  let secret = process.env.key;

  jwt.verify(req.token, secret, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created...",
        authData,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  let secret = process.env.key;

  // Mock user
  const user = {
    id: 1,
    username: "mahe",
    password: "mahe@gmail.com",
  };

  jwt.sign({ user }, secret, { expiresIn: "30s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

app.listen(3000, () => console.log("Server started on port 3000"));
