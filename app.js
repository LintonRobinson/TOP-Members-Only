const path = require("node:path");
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");

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
