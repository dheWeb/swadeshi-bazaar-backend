const pool = require('../config/db'); // Adjust the path as needed
require('dotenv').config();

// Add a product review API
exports.addProductReview = async (req, res) => {
  const { productId } = req.params; // assuming productId is passed in the URL
  const { Name, Email, Rating, Date, Review } = req.body;
  try {
    const connection = await pool.getConnection();
    // Insert review into product_reviews table
    const [result, fields] = await connection.execute('INSERT INTO product_reviews (product_id, name, email, rating, date, review) VALUES (?, ?, ?, ?, ?, ?)', [productId, Name, Email, Rating, Date, Review]);
    // Update review count in products table
    await connection.execute('UPDATE products SET review_count = review_count + 1 WHERE product_id = ?', [productId]);
    connection.release();
    res.status(201).json({ id: result.insertId, Name, Email, Rating, Date, Review });
  } catch (err) {
    console.error('Error adding product review:', err);
    res.status(400).json({ message: 'Error adding product review' });
  }
};

// Fetch all reviews for a specific product
exports.fetchProductReviews = async (req, res) => {
  const { productId } = req.params; // assuming productId is passed in the URL
  try {
    const connection = await pool.getConnection();
    // Fetch reviews from product_reviews table
    const [results, fields] = await connection.execute('SELECT * FROM product_reviews WHERE product_id = ?', [productId]);
    connection.release();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching product reviews:', err);
    res.status(400).json({ message: 'Error fetching product reviews' });
  }
};

// Update a product review
exports.updateProductReview = async (req, res) => {
  const { reviewId } = req.params; // assuming reviewId is passed in the URL
  const { Name, Email, Rating, Date, Review } = req.body;
  try {
    const connection = await pool.getConnection();
    // Update review in product_reviews table
    const [result, fields] = await connection.execute('UPDATE product_reviews SET name = ?, email = ?, rating = ?, date = ?, review = ? WHERE review_id = ?', [Name, Email, Rating, Date, Review, reviewId]);
    connection.release();
    res.status(200).json({ id: reviewId, Name, Email, Rating, Date, Review });
  } catch (err) {
    console.error('Error updating product review:', err);
    res.status(400).json({ message: 'Error updating product review' });
  }
};
