Here’s how you can create a **"Add User" module** using **Node.js**, **Express**, and **MySQL**, adhering to a clean structure:

---

### **Folder Structure**
```plaintext
src/
│
├── controllers/
│   └── userController.js
├── routes/
│   └── userRoutes.js
├── services/
│   └── userService.js
├── models/
│   └── db.js
│   └── userModel.js
└── app.js
```

---

### **Step-by-Step Implementation**

#### 1. **Database Setup**
Create a `users` table in MySQL:
```sql
CREATE DATABASE mydb;

USE mydb;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

#### 2. **Database Connection (`models/db.js`)**
Set up the database connection:
```javascript
const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'mydb'
});

db.getConnection((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Database connected!');
    }
});

module.exports = db;
```

---

#### 3. **User Model (`models/userModel.js`)**
Write SQL queries to interact with the `users` table:
```javascript
const db = require('./db');

const createUser = (user, callback) => {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [user.name, user.email, user.password], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};

module.exports = { createUser };
```

---

#### 4. **User Service (`services/userService.js`)**
Handle business logic for adding a user:
```javascript
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const addUser = async (user) => {
    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return new Promise((resolve, reject) => {
        userModel.createUser({ ...user, password: hashedPassword }, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = { addUser };
```

---

#### 5. **User Controller (`controllers/userController.js`)**
Handle incoming requests and call the service layer:
```javascript
const userService = require('../services/userService');

const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const result = await userService.addUser({ name, email, password });
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Email already exists' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { addUser };
```

---

#### 6. **User Routes (`routes/userRoutes.js`)**
Define the route for adding a user:
```javascript
const express = require('express');
const { addUser } = require('../controllers/userController');

const router = express.Router();

// POST /api/users
router.post('/', addUser);

module.exports = router;
```

---

#### 7. **App Entry Point (`app.js`)**
Initialize the Express app and configure middleware:
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

---

### **Testing the API**
Start the server:
```bash
node src/app.js
```

Test the **Add User API** using Postman or CURL:
- **Endpoint**: `POST http://localhost:3000/api/users`
- **Request Body** (JSON):
  ```json
  {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password123"
  }
  ```
- **Expected Response**:
  ```json
  {
      "message": "User created successfully",
      "userId": 1
  }
  ```

---

### **Improvements**
1. **Validation**: Use a library like `Joi` or `express-validator` for input validation.
2. **Environment Variables**: Use `dotenv` to manage database credentials securely.
3. **Password Security**: Use `bcrypt` for hashing and salting passwords.
4. **Error Handling**: Create a centralized error-handling middleware for consistent error responses. 

This structure and code organization will help you build a clean, scalable, and maintainable Node.js module!