// init.js
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');

dotenv.config();

// MySQL connection using environment variables (from .env file)
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Function to generate random user data using Faker
let createRandomUser = () => {
  return [
    uuidv4(),                          // userId
    faker.internet.username(),         // username
    faker.internet.email(),            // email
    faker.internet.password(8)         // password (8 chars)
  ];
};

// Generate 10 fake users
let users = [];
for (let i = 0; i < 10; i++) {
  users.push(createRandomUser());
}

// Step 1: Delete old data
let deleteQuery = "DELETE FROM user";

// Step 2: Insert new 100 users
let insertQuery = "INSERT INTO user (userId, username, email, password) VALUES ?";

// ✅ Execute
connection.query(deleteQuery, (err) => {
  if (err) {
    console.log("Error deleting old data:", err);
    connection.end();
    return;
  }
  console.log(" Old data cleared successfully!");

  connection.query(insertQuery, [users], (err, result) => {
    if (err) {
      console.log("Error inserting new data:", err);
    } else {
      console.log(`Successfully inserted ${result.affectedRows} fake users!`);
    }
    connection.end(); // close connection
  });
});
