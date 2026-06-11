const pool = require("../db/pool.js");

async function insertUser(user) {
  await pool.query("INSERT INTO users (first_name,last_name,username,password) VALUES ($1,$2,$3,$4)", [user.first_name, user.last_name, user.username, user.password]);
}

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return rows[0];
}

async function getUserById(userId) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
  return rows[0];
}

module.exports = { insertUser, getUserByUsername, getUserById };
