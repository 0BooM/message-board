const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("home");
});

indexRouter.get("/new", (req, res) => {
  res.send("New message");
});

module.exports = indexRouter;