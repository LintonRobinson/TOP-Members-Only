const { Router } = require("express");
const messageRouter = Router();

messageRouter.get("/create-new-message", (req, res) => {
  res.render("create-new-message");
});

module.exports = messageRouter;
