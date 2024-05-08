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

// Create a table in your MySQL database called 'brands' with columns 'label' and 'value'
(async () => {
  const connection = await pool.getConnection();
  await connection.execute(`CREATE TABLE IF NOT EXISTS brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(255) NOT NULL UNIQUE,
    value VARCHAR(255) NOT NULL UNIQUE
  )`);
  connection.release();
})();

exports.Brand = {
  create: async (brandData) => {
    try {
      const connection = await pool.getConnection();
      const [result, fields] = await connection.execute('INSERT INTO brands (label, value) VALUES (?, ?)', [brandData.label, brandData.value]);
      connection.release();
      return { id: result.insertId, ...brandData };
    } catch (err) {
      console.error('Error creating brand:', err);
      throw err;
    }
  },

  findOne: async (query) => {
    try {
      const connection = await pool.getConnection();
      const [results, fields] = await connection.execute('SELECT * FROM brands WHERE ?', query);
      connection.release();
      if (results.length > 0) {
        return results[0];
      }
      return null;
    } catch (err) {
      console.error('Error finding brand:', err);
      throw err;
    }
  }
};
