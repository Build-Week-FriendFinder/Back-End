const jwt = require('jsonwebtoken');
const secret = require('../config/secrets');
const db = require('./helpers');

module.exports = 

function authenticate (req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        // token expired or is invalid
        res.status(401).json({ message: 'You shall not pass!' });
      } else {
        // token is valid
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'You shall not pass!' });
  }
};

async function checkUserCreds(req, res, next) {
  if (!req.body.email || !req.body.password)
    res.status(400).json({ message: 'Send an email and password in body' });
  else next();
}

async function checkUserExists(req, res, next) {
  const { email } = req.body;
  try {
    const emailInDb = await db.findByEmail(email);
    if (emailInDb && emailInDb.email === email) {
      res.status(401).json({ message: 'Email already in use' });
    } else next();
  } catch (err) {
    res.status(500).json({ message: 'Error accessing users' });
  }
}