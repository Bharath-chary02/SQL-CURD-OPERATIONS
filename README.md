# 🧩 User Management System  
_A Full-Stack CRUD Project built using Node.js, Express, EJS, and MySQL_

---

## 🚀 Project Overview  
This project is a simple yet powerful **User Management System** that allows you to **Add, Edit, Delete, and View Users**.  
It’s built as part of my learning journey in the **Apna College Sigma 8.0 Batch** under the guidance of **Shradha Ma’am**.

The goal was to practice **frontend + backend integration**, **database operations**, and **dynamic rendering using EJS**.

---

## ✨ Features  
✅ Add, Edit, and Delete Users with proper validation  
✅ View all users in a dynamic table with user count  
✅ Auto-generate sample users using **Faker.js**  
✅ Clean, user-friendly interface with **internal & external CSS**  
✅ Persistent data storage using **MySQL + UUID**  
✅ Fully responsive and interactive UI  

---

## 🛠️ Tech Stack  
**Frontend:** EJS, HTML, CSS  
**Backend:** Node.js, Express.js  
**Database:** MySQL  
**Libraries Used:** Faker.js, UUID, Method-Override, Dotenv  

---


---

## ⚙️ Setup Instructions  

###1️⃣  Clone this repository  
   ```bash
   git clone https://github.com/your-username/SQL-CURD-OPERATIONS.git
   cd user-management-system

###2️⃣ Install dependencies
   npm install

###3️⃣ Create a .env file in the project root
   Below is an example of what to include in .env.
   (⚠️ Don’t share this file publicly — it contains sensitive information.)

   # Database Configuration
   DB_HOST=your-database-host
   DB_USER=your-database-username
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name

   # App Configuration
   PORT=8080

###4️⃣ Run the initialization script to generate 100 sample users
   node init.js

###5️⃣ Start the server
   node app.js

###6️⃣ Open your browser
   http://localhost:8080