const { Router } = require("express");
const secretClubRouter = Router();
const db = require("../db/queries.js");
const { body, validationResult, matchedData } = require("express-validator");
const validateSecretClubMember = [
  body("secretClubRiddle")
    .trim()
    .custom((value) => {
      return value === "Aang";
    })
    .withMessage("Nope"),
];

secretClubRouter.get("/secret-club/join", (req, res) => {
  res.render("join-secret-club");
});

secretClubRouter.post("/secret-club/join", validateSecretClubMember, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("o Ya");
      return res.render("join-secret-club", { errors: errors.array() });
    }
    const userId = req.session.passport.user;
    await db.updateUserClubMemberStatus(userId, true);
    res.render("join-secret-club", { secretClubSuccess: true });
  } catch (error) {
    next(error);
  }
});

module.exports = secretClubRouter;
