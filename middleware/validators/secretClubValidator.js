const { body } = require("express-validator");
const validateSecretClubMember = [
  body("secretClubRiddle")
    .trim()
    .custom((value) => {
      return value === "Aang";
    })
    .withMessage("Nope"),
];

module.exports = { validateSecretClubMember };
