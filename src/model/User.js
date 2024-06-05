const mysql = require('mysql2/promise');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'swadeshi',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Create a table in your MySQL database called 'users' with appropriate columns
(async () => {
  const connection = await pool.getConnection();
  await connection.execute(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT 'user',
    name VARCHAR(255),
    addresses JSON,
    orders JSON
  )`);
  connection.release();
})();

exports.User = {
  create: async (userData) => {
    try {
      const connection = await pool.getConnection();
      const [result, fields] = await connection.execute('INSERT INTO users (email, password, role, name, addresses, orders) VALUES (?, ?, ?, ?, ?, ?)', [userData.email, userData.password, userData.role, userData.name, JSON.stringify(userData.addresses), JSON.stringify(userData.orders)]);
      connection.release();
      return { id: result.insertId, ...userData };
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    }
  }
};
