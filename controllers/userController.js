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

const getUsers = async (req, res) => { // Added req
    try {
        const result = await userService.getUsers();
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
};

module.exports = { addUser, getUsers };
