const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:process.env.DB_HOST,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

exports.createProduct = async (req, res) => {
  const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images, deleted,discount_price } = req.body;
  try {
    const connection = await pool.getConnection();
    const [result, fields] = await connection.execute('INSERT INTO products (title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images, deleted,discount_price) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, JSON.stringify(images), deleted,discount_price]);
    connection.release();
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(400).json({ message: 'Error creating product' });
  }
};

exports.fetchAllProducts = async (req, res) => {
  let query = 'SELECT * FROM products WHERE deleted != ?';
  let queryParams = [true];

  if (req.query.category) {
    query += ' AND category = ?';
    queryParams.push(req.query.category);
  }
  if (req.query.brand) {
    query += ' AND brand = ?';
    queryParams.push(req.query.brand);
  }

  if (req.query._sort && req.query._order) {
    query += ' ORDER BY ' + req.query._sort + ' ' + req.query._order;
  }

  const totalProductsQuery = 'SELECT COUNT(*) AS total FROM products WHERE deleted != ?';
  const [totalProductsResult] = await pool.execute(totalProductsQuery, [true]);
  const totalDocs = totalProductsResult[0].total;

  if (req.query._page && req.query._limit) {
    const pageSize = parseInt(req.query._limit);
    const page = parseInt(req.query._page);
    query += ' LIMIT ? OFFSET ?';
    queryParams.push(pageSize, (page - 1) * pageSize);
  }

  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute(query, queryParams);
    connection.release();
    res.set('X-Total-Count', totalDocs);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching all products:', err);
    res.status(400).json({ message: 'Error fetching all products' });
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    connection.release();
    res.status(200).json(results[0]);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(400).json({ message: 'Error fetching product by ID' });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    const [result, fields] = await connection.execute('UPDATE products SET title = ?, description = ?, price = ?, discountPercentage = ?, rating = ?, stock = ?, brand = ?, category = ?, thumbnail = ?, images = ? WHERE id = ?', [req.body.title, req.body.description, req.body.price, req.body.discountPercentage, req.body.rating, req.body.stock, req.body.brand, req.body.category, req.body.thumbnail, JSON.stringify(req.body.images), id]);
    connection.release();
    res.status(200).json({ id, ...req.body });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(400).json({ message: 'Error updating product' });
  }
};
