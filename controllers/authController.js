const db = require("../db/queries.js");
const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");

const validateUser = [
  body("username").trim().isEmail().withMessage("Must be valid email"),
  body("confirmedPassword")
    .trim()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords must match"),
];

async function signUpUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("sign-up", { errors: errors.array() });
  }
  const validatedUser = matchedData(req);

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  validatedUser.password = hashedPassword;

  await db.insertUser(validatedUser);

  res.redirect("/");
}

module.exports = { validateUser, signUpUser };
