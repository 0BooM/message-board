const db = require("../db/queries");

module.exports = {
  getHome: async (req, res) => {
    const messages = await db.getAllMessages();
    console.log(messages.author);
    res.render("home", { title: "Mini Messageboard", messages: messages });
  },
  getForm: (req, res) => {
    res.render("form");
  },
  addMessage: async (req, res) => {
    const { author, message } = req.body;
    await db.insertMessage(author, message);
    res.redirect("/");
  },
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
