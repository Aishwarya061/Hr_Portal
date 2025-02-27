const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: '',  //your_mysql_username
    password: '', //your_mysql_password
    database: 'hr_portal',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();
