const sql = require('mysql2');

// Connecting to the database
const db = sql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log('Connected to the employee database!'),
    console.log('-----------------')
);

module.exports = db;