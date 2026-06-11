const { Client } = require("pg");

const SQL = `
CREATE TABLE users (
id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
username TEXT UNIQUE,
password TEXT,
first_name TEXT,
last_name TEXT, 
admin BOOLEAN DEFAULT false
);


CREATE TABLE messages (
id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,  
message TEXT,
created_at TIMESTAMPTZ DEFAULT NOW(), 
user INTEGER REFERENCES users(id)

);
`;

async function main() {
  const client = new Client({ connectionString: "postgresql://lintonrobinson@localhost:5432/top_users" });
  await client.connect();
  await client.query(SQL);
  await client.end();
  await console.log("Done seeding");
}

main();
