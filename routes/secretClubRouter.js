const { Router } = require("express");
const secretClubRouter = Router();
const secretClubController = require("../controllers/secretClubController.js");
const { validateSecretClubMember } = require("../middleware/validators/secretClubValidator.js");

secretClubRouter.get(
  "/secret-club/join",
  (req, res, next) => {
    //
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/");
    }
  },
  (req, res) => {
    res.render("join-secret-club");
  },
);

secretClubRouter.post("/secret-club/join", validateSecretClubMember, secretClubController.giveUserClubMemberStatus);

module.exports = secretClubRouter;
