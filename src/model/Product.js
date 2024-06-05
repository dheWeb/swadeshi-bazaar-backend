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

// Create a table in your MySQL database called 'products' with appropriate columns
(async () => {
  const connection = await pool.getConnection();
  await connection.execute(`CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    discountPercentage INT,
    rating DECIMAL(2,1) DEFAULT 0,
    stock INT DEFAULT 0,
    brand VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    thumbnail VARCHAR(255) NOT NULL,
    images TEXT NOT NULL,
    deleted BOOLEAN DEFAULT FALSE
  )`);
  connection.release();
})();

exports.Product = {
  create: async (productData) => {
    try {
      const connection = await pool.getConnection();
      const [result, fields] = await connection.execute('INSERT INTO products (title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [productData.title, productData.description, productData.price, productData.discountPercentage, productData.rating, productData.stock, productData.brand, productData.category, productData.thumbnail, JSON.stringify(productData.images), productData.deleted]);
      connection.release();
      return { id: result.insertId, ...productData };
    } catch (err) {
      console.error('Error creating product:', err);
      throw err;
    }
  }
};
