const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config(); // Make sure this is included to load environment variables

const productsRouter = require('./src/routes/Products');
const categoriesRouter = require('./src/routes/Categories');
const brandsRouter = require('./src/routes/Brands');
const usersRouter = require('./src/routes/Users');
const authRouter = require('./src/routes/Auth');
const cartRouter = require('./src/routes/Cart');
const ordersRouter = require('./src/routes/Order');
const pool = require('./src/config/db'); // Import the database connection from db.js

const server = express();

server.use(cors({
    exposedHeaders: ['X-Total-Count']
}));
server.use(express.json());
server.use(cookieParser());
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Set to true if using HTTPS
}));

server.use('/products', productsRouter);
server.use('/categories', categoriesRouter);
server.use('/brands', brandsRouter);
server.use('/users', usersRouter);
server.use('/auth', authRouter);
server.use('/cart', cartRouter);
server.use('/orders', ordersRouter);

main().catch(err => console.log(err));

async function main() {
    try {
        await pool.getConnection(); // Test the connection to the database
        console.log('Database connected');

        server.get('/', (req, res) => {
            res.json({ status: 'success' });
        });

        server.listen(8081, () => {
            console.log('Server started');
        });
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}
