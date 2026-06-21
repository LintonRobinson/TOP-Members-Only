const db = require("../db/queries.js");
const { validationResult } = require("express-validator");

async function giveUserClubMemberStatus(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("join-secret-club", { errors: errors.array(), user: req.user });
    }
    const userId = req.session.passport.user;
    await db.updateUserClubMemberStatus(userId, true);
    res.render("join-secret-club", { secretClubSuccess: true, user: req.user });
  } catch (error) {
    next(error);
  }
}

module.exports = { giveUserClubMemberStatus };
