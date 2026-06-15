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
    res.render("log-in", { authMessage: req.session.messages[0] });
    delete req.session.messages;
    return;
  }
  console.dir(req.session, { depth: null });
  res.render("log-in");
});

authRouter.post(
  "/log-in",
  passport.authenticate("local", {
    failureRedirect: "/log-in",
    failureMessage: true,
  }),
  (req, res) => {
    if (!req.session.messages?.[0]) {
      req.session.messages = [];
      req.session.messages[0] = "Successful log in!";
    }
    res.redirect("/log-in");
  },
);

module.exports = authRouter;
