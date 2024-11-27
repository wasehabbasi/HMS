const db = require('./db');

const createUser = (user, callback) => {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [user.name, user.email, user.password], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};

const getUsers = (callback) =>{
    const query = 'SELECT * FROM users';
    db.query(query, (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
}

module.exports = { createUser, getUsers };
