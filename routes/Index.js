const { Router } = require("express");
const indexRouter = Router();
const IndexController = require('../controllers/IndexController');

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

indexRouter.get("/", IndexController.getHome);
indexRouter.get("/new", IndexController.getForm);
indexRouter.post("/new", IndexController.addMessage);
indexRouter.get("/message/:id", IndexController.showDetails);
indexRouter.get("/delete", IndexController.deleteMessages);

module.exports = indexRouter;
