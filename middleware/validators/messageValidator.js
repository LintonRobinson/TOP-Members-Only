const { body } = require("express-validator");
const validateMessage = [body("messageTitle").trim().escape(), body("message").trim().escape()];
module.exports = { validateMessage };
