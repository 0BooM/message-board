const { Client } = require("pg");

const SQL = `CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    author VARCHAR (255), 
    text VARCHAR (255)
);

INSERT INTO messages (author, text) VALUES
('Bryan', 'Hello, It''s me!'),
('Bill Clinton', 'Howdy, Dear Americans!'),
('Donald', 'Hello my fellow neighbors');
`;

async function main(){
    console.log("sending...");
    const client = new Client({
      connectionString:
        "postgresql://boomlin:Haselko14@localhost:5432/message_board",
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();