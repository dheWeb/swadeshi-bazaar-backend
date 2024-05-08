const mysql = require('mysql2/promise');
const { loginUser } = require('./Auth');

const pool = mysql.createPool({
  host:process.env.DB_HOST,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

exports.fetchOrdersByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute('SELECT * FROM orders WHERE user_id = ?', [userId]);
    connection.release();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching orders by user:', err);
    res.status(400).json({ message: 'Error fetching orders by user' });
  }
};

exports.createOrder = async (req, res) => {
  console.log(req);
  try {
    const connection = await pool.getConnection();
    const [result, fields] = await connection.execute('INSERT INTO orders (items, totalAmount, totalItems, user_id, paymentMethod, status, selectedAddress) VALUES (?, ?, ?, ?, ?, ?, ?)', [JSON.stringify(req.body.items), req.body.totalAmount, req.body.totalItems, req.body.user_id, req.body.paymentMethod, req.body.status, JSON.stringify(req.body.selectedAddress)]);
    connection.release();
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(400).json({ message: 'Error creating order' });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    await connection.execute('DELETE FROM orders WHERE id = ?', [id]);
    connection.release();
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(400).json({ message: 'Error deleting order' });
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    await connection.execute('UPDATE orders SET items = ?, totalAmount = ?, totalItems = ?, user_id = ?, paymentMethod = ?, status = ?, selectedAddress = ? WHERE id = ?', [JSON.stringify(req.body.items), req.body.totalAmount, req.body.totalItems, req.body.user_id, req.body.paymentMethod, req.body.status, JSON.stringify(req.body.selectedAddress), id]);
    connection.release();
    res.status(200).json({ id, ...req.body });
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(400).json({ message: 'Error updating order' });
  }
};

exports.fetchAllOrders = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    let query = 'SELECT * FROM orders WHERE deleted != ?';
    let queryParams = [true];
  
    if (req.query._sort && req.query._order) {
      query += ' ORDER BY ' + req.query._sort + ' ' + req.query._order;
    }
  
    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit);
      const page = parseInt(req.query._page);
      query += ' LIMIT ? OFFSET ?';
      queryParams.push(pageSize, (page - 1) * pageSize);
    }
  
    const [results, fields] = await connection.execute(query, queryParams);
    const totalDocs = await connection.execute('SELECT COUNT(*) AS total FROM orders WHERE deleted != ?', [true]);
    connection.release();
    res.set('X-Total-Count', totalDocs[0][0].total);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching all orders:', err);
    res.status(400).json({ message: 'Error fetching all orders' });
  }
};
