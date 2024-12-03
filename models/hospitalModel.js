const db = require('./db');

const createHospital = (hospital, callback) => {
    const query = 'INSERT INTO `hospitals` (`name`, `address`, `phone_number`) VALUES (?, ?, ?)';
    db.query(query, [hospital.name, hospital.address, hospital.phone_number], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
}

module.exports = { createHospital };