const path = require("node:path");
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const authRouter = require("./routes/authRouter.js");

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

const pool = require("./db/pool.js");
app.use(methodOverride("_method"));

const postgresStore = require("connect-pg-simple")(session);

const sessionStore = new postgresStore({ pool: pool });

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
  }),
);

app.use(passport.session());
const db = require("./db/queries.js");
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUserByUsername(username);

      if (!user) {
        return done(null, false, { message: "user does not exist" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: "invalid password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  console.log("serialize");
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await db.getUserById(userId);
    return done(null, user);
  } catch (error) {
    done(error);
  }
});

app.use(authRouter);

// No Path Found Error Fallback
app.use(errorHandlers.notFound);

// Errors forwarded by next(err)
app.use(errorHandlers.serverError);

app.listen(PORT, () => console.log("app listening on port 3000!"));
