Creating a well-structured Node.js application involves adhering to best practices that ensure scalability, maintainability, and readability. Here's a detailed guide:

---

### **1. Folder Structure**
Organize your project to separate concerns effectively. A common structure is:

```plaintext
src/
│
├── controllers/        # Route handlers
├── services/           # Business logic
├── models/             # Database models and schemas
├── routes/             # API routes
├── middlewares/        # Middleware functions
├── config/             # Configuration files (e.g., environment, database)
├── utils/              # Utility/helper functions
├── validations/        # Input validations
├── public/             # Static assets (if any)
├── tests/              # Unit and integration tests
├── app.js              # Main application logic
└── server.js           # Server initialization
```

---

### **2. Separation of Concerns**
- **Routes**: Define API endpoints in `routes/` and delegate functionality to controllers.
- **Controllers**: Handle HTTP requests, responses, and validation errors. Keep them lightweight by delegating heavy processing to services.
- **Services**: Contain the business logic of your application. This layer interacts with models or external APIs.
- **Models**: Define your database schema and interact with the database.
- **Middlewares**: Write reusable functions for authentication, logging, error handling, etc.
- **Config**: Store configuration (e.g., environment variables) using libraries like `dotenv`.

---

### **3. Business Logic**
- **Write business logic in the `services` layer**:
  - Keeps controllers clean and focused on handling HTTP.
  - Makes it easier to test business logic independently.
- Example:
  ```javascript
  // services/userService.js
  const User = require('../models/user');

  const getUserById = async (userId) => {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');
      return user;
  };

  module.exports = { getUserById };
  ```

  ```javascript
  // controllers/userController.js
  const userService = require('../services/userService');

  const getUser = async (req, res) => {
      try {
          const user = await userService.getUserById(req.params.id);
          res.status(200).json(user);
      } catch (error) {
          res.status(404).json({ message: error.message });
      }
  };

  module.exports = { getUser };
  ```

---

### **4. Use Environment Variables**
- Use `dotenv` to store sensitive information like database credentials, API keys, etc.
- Example:
  ```plaintext
  .env
  PORT=3000
  DB_URI=mongodb://localhost:27017/mydb
  ```

  ```javascript
  // config/db.js
  const mongoose = require('mongoose');
  const connectDB = async () => {
      try {
          await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
          console.log('Database connected');
      } catch (err) {
          console.error(err.message);
          process.exit(1);
      }
  };

  module.exports = connectDB;
  ```

---

### **5. Middleware Design**
- Use middleware for common functionalities like:
  - **Authentication**: Verify user tokens using `jsonwebtoken`.
  - **Error Handling**: Catch and format errors consistently.
  - **Request Validation**: Validate request payloads using libraries like `Joi` or `express-validator`.

---

### **6. Use Promises or Async/Await**
Avoid callback hell. Use `async/await` for better readability and error handling with `try/catch`.

---

### **7. Logging**
- Use a robust logging library like `winston` or `pino` for logging requests, errors, and application events.

---

### **8. Handle Errors Gracefully**
- Centralize error handling using a middleware.
  ```javascript
  app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: 'Something went wrong!' });
  });
  ```

---

### **9. Modularize Your Code**
- Break down large files into smaller modules to maintain clarity and focus.

---

### **10. Use TypeScript**
For large projects, use TypeScript for type safety and better tooling.

---

### **11. Security Best Practices**
- Use `helmet` to set secure HTTP headers.
- Sanitize inputs to avoid SQL injection or XSS attacks.
- Hash passwords with `bcrypt`.
- Regularly update dependencies to patch vulnerabilities.

---

### **12. Testing**
- Write unit tests for services and integration tests for routes using `Jest`, `Mocha`, or `Chai`.
- Example:
  ```javascript
  // tests/userService.test.js
  const { getUserById } = require('../services/userService');

  test('Should return user by ID', async () => {
      const user = await getUserById('validUserId');
      expect(user).toHaveProperty('_id');
  });
  ```

---

### **13. Use Dependency Injection**
- Inject dependencies like database instances or configuration into services to make them more testable.

---

### **14. Use an API Documentation Tool**
- Use `Swagger` or `Postman` to document APIs.

---

### **15. Monitor and Optimize**
- Monitor app performance using tools like `New Relic` or `AppSignal`.
- Optimize database queries using indexes and query optimizers.

---

Adopting these best practices will help you build a scalable and maintainable Node.js application.