const { Pool } = require("pg");

const pool = new Pool({ connectionString: "postgresql://lintonrobinson@localhost:5432/top_users" });

module.exports.pool;
