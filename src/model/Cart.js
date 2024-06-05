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

// Create a table in your MySQL database called 'carts' with appropriate columns
(async () => {
  const connection = await pool.getConnection();
  await connection.execute(`CREATE TABLE IF NOT EXISTS carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);
  connection.release();
})();

exports.Cart = {
  create: async (cartData) => {
    try {
      const connection = await pool.getConnection();
      const [result, fields] = await connection.execute('INSERT INTO carts (quantity, product_id, user_id) VALUES (?, ?, ?)', [cartData.quantity, cartData.product, cartData.user]);
      connection.release();
      return { id: result.insertId, ...cartData };
    } catch (err) {
      console.error('Error creating cart:', err);
      throw err;
    }
  }
};
