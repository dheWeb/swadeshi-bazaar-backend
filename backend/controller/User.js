const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:process.env.DB_HOST,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
exports.fetchUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
    connection.release();
    res.status(200).json(results[0]);
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(400).json({ message: 'Error fetching user by ID' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    const [result, fields] = await connection.execute('UPDATE users SET  addresses = ?, orders = ? WHERE id = ?', [JSON.stringify(req.body.addresses),JSON.stringify(req.body.orders), id]);
    connection.release();
    res.status(200).json({ id, ...req.body });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(400).json({ message: 'Error updating user' });
  }
};
