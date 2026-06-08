const { body, validationResult, matchedData } = require("express-validator");
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

  res.redirect("/");
}

module.exports = { validateUser, signUpUser };
