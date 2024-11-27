const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hms_db'
});

db.getConnection((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Database connected!');
    }
});

module.exports = db;