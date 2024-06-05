const pool = require('../config/db'); // Adjust the path as needed

exports.fetchCategories = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute('SELECT * FROM categories');
    connection.release();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(400).json({ message: 'Error fetching categories' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [result, fields] = await connection.execute('INSERT INTO categories (label, value) VALUES (?, ?)', [req.body.label, req.body.value]);
    connection.release();
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(400).json({ message: 'Error creating category' });
  }
};
