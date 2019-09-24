const jwt = require('jsonwebtoken');
const secret = require('../config/secrets');
const db = require('./helpers');

module.exports = {
  authenticate,
  checkUserCreds,
  checkUserExists
}

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
  if (!req.body.name || !req.body.email || !req.body.password || !req.body.dob)
    res.status(400).json({ message: 'Request missing required information' });
  else next();
}

function checkUserExists(req, res, next) {
    const { email } = req.body.email
    db.findUserBy({ email } === email)
    .first()
    .then(user => {
      if (user && user.email === email) {
        res.status(401).json({ message: 'Email already in use' });
      } else next();
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Server error checking if user exists." })
    })
}