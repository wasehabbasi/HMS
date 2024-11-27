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

const getUsers = async () => {
    return new Promise((resolve, reject) => {
        userModel.getUsers((err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = { addUser, getUsers };
