const pool = require("../db/pool.js");

async function insertUser(user) {
  await pool.query("INSERT INTO users (first_name,last_name,username,password) VALUES ($1,$2,$3,$4)", [user.first_name, user.last_name, user.username, user.password]);
}

async function updateUserClubMemberStatus(userId, updatedMembershipStatus) {
  await pool.query("UPDATE users SET is_club_member = $2 WHERE id = $1", [userId, updatedMembershipStatus]);
}

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return rows[0];
}

async function getUserById(userId) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
  return rows[0];
}

async function createNewMessage(messageContents, userId) {
  await pool.query("INSERT INTO messages (message_title, message, user_id) VALUES ($1,$2,$3)", [messageContents.messageTitle, messageContents.message, userId]);
}

module.exports = { insertUser, updateUserClubMemberStatus, getUserByUsername, getUserById, createNewMessage };
