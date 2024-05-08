const { log } = require('console');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:process.env.DB_HOST,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

exports.fetchCartByUser = async (req, res) => {
  const { user } = req.query;
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute('SELECT * FROM carts WHERE user_id = ?', [req.query.users]);
    connection.release();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching cart items:', err);
    res.status(400).json({ message: 'Error fetching cart items' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    console.log(JSON.stringify(req.body));
    const [result, fields] = await connection.execute('INSERT INTO carts (quantity, product_id, user_id,price,name) VALUES (?, ?, ?,?,?)', [req.body.quantity, req.body.product_id, req.body.user_id,req.body.price,req.body.name]);
    connection.release();
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(400).json({ message: 'Error adding to cart' });
  }
};

exports.deleteFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    await connection.execute('DELETE FROM carts WHERE id = ?', [id]);
    connection.release();
    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (err) {
    console.error('Error deleting from cart:', err);
    res.status(400).json({ message: 'Error deleting from cart' });
  }
};

exports.updateCart = async (req, res) => {
  const { id } = req.params;
  console.log(req);
  try {
    const connection = await pool.getConnection();
    await connection.execute('UPDATE carts SET quantity = ?, product_id = ?, user_id = ? WHERE id = ?', [req.body.quantity, req.body.product, req.body.user_id,id]);
    connection.release();
    res.status(200).json({ id, ...req.body });
  } catch (err) {
    console.error('Error updating cart:', err);
    res.status(400).json({ message: 'Error updating cart' });
  }
};
