const { Client } = require("pg");

const SQL = `
CREATE TABLE users (
id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY    
username text UNIQUE,
password text 
);


CREATE TABLE messages (
id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY  
message text,
user INTEGER REFRENCES users(id)
);
`;
// Message board

// User signs in

// User - id , username (email) , password

function main() {
  const client = new Client({ connectionString: "postgresql://lintonrobinson@localhost:5432/top_users" });
  client.connect();
  client.query(SQL);
  client.end();
  console.log("Done seeding");
}

main();
