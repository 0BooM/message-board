const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const alphaErr = "Must only contain letters";
const lengthErr = "Must be between 1 and 60 characters";
const validateMessageContent = [
  body("author").trim()
    .isAlpha().withMessage(`Author ${alphaErr}`)
    .isLength({min: 1, max: 60}).withMessage(`Author ${lengthErr}`),
];

module.exports = {
  getHome: async (req, res) => {
    const messages = await db.getAllMessages();
    console.log(messages.author);
    res.render("home", { title: "Mini Messageboard", messages: messages });
  },
  getForm: (req, res) => {
    res.render("form");
  },
  addMessage: [ validateMessageContent,
      async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          return res.status(400).render("form",{
            errors: errors.array(),
          })
        }
        const { author, message } = req.body;
        await db.insertMessage(author, message);
        res.redirect("/");
    }
  ],
  showDetails: async (req, res) => {
    const message = await db.getMessageById(req.params.id);

    if (!message) {
      return res.status(404).send("Message not found! :(");
    }
    res.render("message", { message });
  },
  deleteMessages: async(req, res) => {
    db.deleteMessages();
    res.redirect("/");
  }
};
