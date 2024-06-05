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

// Create a table in your MySQL database called 'orders' with appropriate columns
(async () => {
  const connection = await pool.getConnection();
  await connection.execute(`CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    items JSON NOT NULL,
    totalAmount DECIMAL(10,2),
    totalItems INT,
    user_id INT,
    paymentMethod VARCHAR(255) NOT NULL,
    status VARCHAR(255) DEFAULT 'pending',
    selectedAddress JSON NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);
  connection.release();
})();

exports.Order = {
  create: async (orderData) => {
    try {
      const connection = await pool.getConnection();
      const [result, fields] = await connection.execute('INSERT INTO orders (items, totalAmount, totalItems, user_id, paymentMethod, selectedAddress) VALUES (?, ?, ?, ?, ?, ?)', [JSON.stringify(orderData.items), orderData.totalAmount, orderData.totalItems, orderData.user, orderData.paymentMethod, JSON.stringify(orderData.selectedAddress)]);
      connection.release();
      return { id: result.insertId, ...orderData };
    } catch (err) {
      console.error('Error creating order:', err);
      throw err;
    }
  }
};
