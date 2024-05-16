const express = require('express');
const server = express();
const mysql = require('mysql2/promise');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const productsRouter = require('./routes/Products');
const categoriesRouter = require('./routes/Categories');
const brandsRouter = require('./routes/Brands');
const usersRouter = require('./routes/Users');
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart');
const ordersRouter = require('./routes/Order');

server.use(cors({
    exposedHeaders:['X-Total-Count']
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
    const pool = mysql.createPool({
        host:process.env.DB_HOST,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    console.log('Database connected');

    server.get('/', (req, res) => {
        res.json({ status: 'success' });
    });

    server.listen(8081, () => {
        console.log('Server started');
    });
}
