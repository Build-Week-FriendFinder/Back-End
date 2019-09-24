const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();

const { authenticate } = require('../auth/middleware.js');
const authRouter = require('../auth/auth-router.js');
const userRouter = require('../routers/users/user-router');
const swipeRouter = require('../routers/swipes/swipe-router');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/user', authenticate, userRouter);
server.use('/api/swipe', authenticate, swipeRouter);

module.exports = server;