const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");
const passport = require("passport");
const { validateUser } = require("../middleware/validators/authValidator.js");

authRouter.post("/sign-up", validateUser, authController.signUpUser);

authRouter.get("/sign-up", (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.render("sign-up");
  } else {
    res.redirect("/");
  }
});

authRouter.get(
  "/log-in",
  (req, res, next) => {
    //
    if (!req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/");
    }
  },
  (req, res) => {
    if (req.session.messages) {
      res.render("log-in", { authMessage: req.session.messages[0] });
      delete req.session.messages;
      return;
    }

    res.render("log-in");
  },
);

authRouter.post(
  "/log-in",
  passport.authenticate("local", {
    failureRedirect: "/log-in",
    failureMessage: true,
  }),
  (req, res) => {
    res.render("log-in", { authMessage: "Successful log in!", user: req.user, userFirstName: req.user.first_name });
  },
);

authRouter.get("/log-out", (req, res, error) => {
  req.logOut((error) => {
    if (error) return next(error);
    res.redirect("/log-in");
  });
});

module.exports = authRouter;
