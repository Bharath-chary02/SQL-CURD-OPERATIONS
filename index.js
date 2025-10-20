// Importing required libraries
const { faker } = require('@faker-js/faker'); // For generating fake data
const mysql = require('mysql2');              // MySQL database connection
const express = require("express");           // Express framework
const app = express();
const path = require("path");                 // To handle file paths
const methodOverride = require("method-override"); // To support PUT/PATCH/DELETE methods via forms
const { v4: uuidv4 } = require('uuid');      // To generate unique user IDs
const dotenv = require('dotenv');

dotenv.config();

// Setting up EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));

// Middleware
app.use(methodOverride("_method"));          // Allows method overriding for forms
app.use(express.urlencoded({extended : true})); // Parses form data
app.use(express.static("public"));          // Serves static files from public folder

// Server port
const port = 8080;

// Start the server
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

// MySQL connection using environment variables (from .env file)
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Function to generate random user data using Faker
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), // generates random username
    faker.internet.email(),    // generates random email
    faker.internet.password(), // generates random password
   ];
}

// ========================= Routes ========================= //

// Home route - shows total user count
app.get("/", (req, res) => {
  let q = "SELECT COUNT(*) AS count FROM user";
  connection.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error occurred");
    }
    let count = result[0].count;
    res.render("home", { count }); // Render home.ejs with user count
  });
});

// Display all users
app.get("/user", (req, res) => {
  let q = "SELECT * FROM user";
  connection.query(q, (err, users) => {
    if (err) {
      console.log(err);
      return res.send("Error occurred");
    }
    res.render("users", { users }); // Render users.ejs with user data
  });
});

// Edit user page
app.get("/user/:id/edit", (req, res) => {
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE userId = '${id}'`;
  connection.query(q, (err, users) => {
    if (err) {
      console.log(err);
      return res.send("Error occurred");
    }
    let user = users[0];
    res.render("edit", { user }); // Render edit.ejs with selected user
  });
});

// Update user (PATCH method)
app.patch("/user/:id", (req, res) => {
  let {id} = req.params;
  let {password : formPass, username: newUsername} = req.body;

  // Check if entered password matches current user's password
  let q = `SELECT * FROM user WHERE userId = '${id}'`;
  connection.query(q, (err, users) => {
    if (err) {
      console.log(err);
      return res.send("Error occurred");
    }
    let user = users[0];

    if(formPass != user.password){
      res.send("Wrong pass"); // Password mismatch
    }
    else{
      // Update username
      let q2 = `UPDATE user SET username = '${newUsername}' WHERE userId = '${id}'`;
      connection.query(q2, (err, users) => {
        if (err) {
          console.log(err);
          return res.send("Error occurred");
        }
        res.redirect("/user"); // Redirect to user list
      });
    }
  });
});

// Add user page
app.get("/user/add", (req, res) => {
  res.render("add"); // Render add.ejs
});

// Create new user (POST method)
app.post("/user/add", (req, res) => {
  let {username : newUsername,useremail: newEmail, password : newPassword} = req.body;
  let userId = uuidv4(); // Generate unique ID

  let q = `INSERT INTO user VALUES (?, ?, ?, ?)`;
  let user = [userId, newUsername, newEmail, newPassword];

  connection.query(q,user,(err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error occurred");
    }
    res.redirect("/user"); // Redirect to user list
  });
});

// Delete user page
app.get("/user/:id/delete", (req, res) => {
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE userId = '${id}'`;
  connection.query(q, (err, users) => {
    if (err) {
      console.log(err);
      return res.send("Error occurred");
    }
    let user = users[0];
    res.render("delete", { user }); // Render delete.ejs with user info
  });
});

// Delete user (DELETE method)
app.delete("/user/:id/delete", (req, res) => {
  let {id} = req.params;
  let {password : formPass} = req.body;

  // Verify password before deletion
  let q = `SELECT * FROM user WHERE userId = '${id}'`;
  connection.query(q, (err, users) => {
    if (err) {
      console.log(err);
      return res.send("Error occurred");
    }
    let user = users[0];

    if(formPass != user.password){
      res.send("Wrong pass"); // Password mismatch
    }
    else{
      // Delete user
      let q2 = `DELETE FROM user WHERE userId = '${id}'`;
      connection.query(q2, (err, users) => {
        if (err) {
          console.log(err);
          return res.send("Error occurred");
        }
        res.redirect("/user"); // Redirect to user list
      });
    }
  });
});
