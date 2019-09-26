const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
// Add authenticate as a middleware to any route that requires JWT protection.
const { authenticate } = require('../auth/middleware.js');
const authRouter = require('../auth/auth-router.js');
const userRouter = require('../routers/users/user-router');
const swipeRouter = require('../routers/swipes/swipe-router');
const messageRouter = require('../routers/messages/message-router');
const friendsRouter = require('../routers/friends/friends-router');
const surveyRouter = require('../routers/survey/survey-router');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/user', userRouter);
server.use('/api/survey', surveyRouter);
server.use('/api/swipe', swipeRouter);
server.use('/api/messages', messageRouter);
server.use('/api/friends', friendsRouter);

module.exports = server;