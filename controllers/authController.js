const db = require("../db/queries.js");
const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");

const validateUser = [
  body("first_name").trim().escape(),
  body("last_name").trim().escape(),
  body("username").trim().isEmail().normalizeEmail().withMessage("Must be valid email"),
  body("password").trim(),
  body("confirmedPassword")
    .trim()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords must match"),
];

async function signUpUser(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("sign-up", { errors: errors.array() });
    }

    const validatedUser = matchedData(req);
    const hashedPassword = await bcrypt.hash(validatedUser.password, 10);
    delete validatedUser.confirmedPassword;
    validatedUser.password = hashedPassword;
    await db.insertUser(validatedUser);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
}

module.exports = { validateUser, signUpUser };
