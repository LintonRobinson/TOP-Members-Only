const db = require("../db/queries.js");
const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");

async function signUpUser(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("sign-up", { errors: errors.array() });
    }

    const validatedUser = matchedData(req);
    const isAdmin = req.body.admin === "on";
    validatedUser.admin = isAdmin;
    const hashedPassword = await bcrypt.hash(validatedUser.password, 10);
    delete validatedUser.confirmedPassword;
    validatedUser.password = hashedPassword;
    await db.insertUser(validatedUser);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
}

module.exports = { signUpUser };
