const { Router } = require("express");
const messageRouter = Router();
const { validateMessage } = require("../middleware/validators/messageValidator.js");
const messageController = require("../controllers/messageController.js");

messageRouter.get("/", messageController.getAllMessages, (req, res) => {
  const user = req.user || null;
  res.render("messages", { messages: res.locals.allMessages, user: req.user });
});

messageRouter.get("/create-new-message", (req, res) => {
  res.render("create-new-message", { user: req.user });
});

messageRouter.post("/create-new-message", validateMessage, messageController.createNewMessage);

messageRouter.get("/message/delete/:id", messageController.deleteMessage);

module.exports = messageRouter;
