const path = require("node:path");
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");

const errorHandlers = require("./middleware/errors.js");

// SSR Static Asset Configuration
const assetsPath = path.join(__dirname, "public");
const PORT = 3000;
app.use(express.static(assetsPath));

// SSR View / View Ingine  Configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Parse Form Input Values and Return Variables With Names
app.use(express.urlencoded({ extended: true }));

// Override HTML form methods
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// No Path Found Error Fallback
app.use(errorHandlers.notFound);

// Errors forwarded by next(err)
app.use(errorHandlers.serverError);

app.listen(PORT, () => console.log("app listening on port 3000!"));
