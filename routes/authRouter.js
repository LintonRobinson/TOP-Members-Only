const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");

authRouter.post("/sign-up", authController.validateUser, authController.signUpUser);

authRouter.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

module.exports = authRouter;
