const { body } = require("express-validator");
const validateUser = [
  body("first_name").trim().escape(),
  body("last_name").trim().escape(),
  body("username").trim().isEmail().normalizeEmail().withMessage("Invalid email"),
  body("password").trim(),
  body("confirmedPassword")
    .trim()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),
];

module.exports = { validateUser };
