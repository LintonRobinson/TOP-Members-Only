const pool = require("../db/pool.js");

async function insertUser(user) {
  await pool.query("INSERT INTO users (username,password) VALUES ($1,$2)", [user.username, user.password]);
}

module.exports = { insertUser };
