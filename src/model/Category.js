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

// Create a table in your MySQL database called 'categories' with appropriate columns
(async () => {
  const connection = await pool.getConnection();
  await connection.execute(`CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(255) NOT NULL UNIQUE,
    value VARCHAR(255) NOT NULL UNIQUE
  )`);
  connection.release();
})();

exports.Category = {
  create: async (categoryData) => {
    try {
      const connection = await pool.getConnection();
      const [result, fields] = await connection.execute('INSERT INTO categories (label, value) VALUES (?, ?)', [categoryData.label, categoryData.value]);
      connection.release();
      return { id: result.insertId, ...categoryData };
    } catch (err) {
      console.error('Error creating category:', err);
      throw err;
    }
  }
};
