const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");
const passport = require("passport");

authRouter.post("/sign-up", authController.validateUser, authController.signUpUser);

authRouter.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

authRouter.get("/log-in", (req, res) => {
  if (req.session.messages) {
    res.render("log-in", { authError: req.session.messages[0] });
    delete req.session.messages;
    return;
  }
  res.render("log-in");
});

authRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: true,
  }),
);

module.exports = authRouter;
