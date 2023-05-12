const express = require("express");

const usersController = require("./controllers/users.controller");
const postController = require("./controllers/posts.controller");
const analyticsController = require("./controllers/analytics.controller");

const app = express();

app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://lucent-mermaid-acbd57.netlify.app/"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

app.use(express.json());

app.use("/users", usersController);
app.use("/posts", postController);
app.use("/analytics", analyticsController);

module.exports = app;
