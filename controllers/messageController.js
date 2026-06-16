const db = require("../db/queries.js");

const { validationResult, matchedData } = require("express-validator");

async function createNewMessage(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("create-new-message", { errors: errors.array() });
    }
    const validatedMessage = matchedData(req);
    await db.createNewMessage(validatedMessage, req.session.passport.user);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
}

module.exports = { createNewMessage };
