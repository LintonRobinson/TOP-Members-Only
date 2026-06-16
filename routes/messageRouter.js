const { Router } = require("express");
const messageRouter = Router();
const { validateMessage } = require("../middleware/validators/messageValidator.js");
const messageController = require("../controllers/messageController.js");

messageRouter.get("/create-new-message", (req, res) => {
  res.render("create-new-message");
});

messageRouter.post("/create-new-message", validateMessage, messageController.createNewMessage);

module.exports = messageRouter;
