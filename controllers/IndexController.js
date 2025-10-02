const db = require("../db/queries");

// const messages = [
//   {
//     text: "Hi there!",
//     user: "Amando",
//     added: new Date(),
//   },
//   {
//     text: "Hello World!",
//     user: "Charles",
//     added: new Date(),
//   },
// ];

module.exports = {
  getHome: async (req, res) => {
    const messages = await db.getAllMessages();
    console.log(messages.author);
    res.render("home", { title: "Mini Messageboard", messages: messages });
  },
  getForm: (req, res) => {
    res.render("form");
  },
  addMessage: (req, res) => {
    const author = req.body.author;
    const message = req.body.messageText;
    messages.push({ text: message, user: author, added: new Date() });
    res.redirect("/");
  },
  showDetails: async (req, res) => {
    const message = await db.getMessageById(req.params.id);

    if (!message) {
      return res.status(404).send("Message not found! :(");
    }
    res.render("message", { message });
  }
};
