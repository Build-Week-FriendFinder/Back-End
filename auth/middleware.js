const jwt = require('jsonwebtoken');
const secret = require('../config/secrets');
const db = require('./helpers');

module.exports = {
  authenticate,
  checkUserCreds,
  checkUserExists,
  validateUserId,
  validateFriendId,
  validateSwiperId,
  validateSwipedId
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

function checkUserCreds(req, res, next) {
  if (!req.body.name || !req.body.email || !req.body.password || !req.body.dob)
    res.status(400).json({ message: 'Request missing required information' });
  else next();
};

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
};

function validateUserId(req, res, next) {
  const { user_id } = req.params;
  if(user_id) {
      db.findUserById(user_id)
      .then(user => {
          if(user) {
              next();
          } else {
              res.status(404).json({ error: "Invalid user id" });
          }
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ error: "Server error getting user by id"})
      });
  } else {
      next();
  }
};

function validateFriendId(req, res, next) {
  const { friend_id } = req.params;
  if(friend_id) {
      db.findUserById(friend_id)
      .then(user => {
          if(user) {
              next();
          } else {
              res.status(404).json({ error: "Invalid friend id" });
          }
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ error: "Server error getting friend by id"})
      });
  } else {
      next();
  }
};

function validateSwiperId(req, res, next) {
  const { swiper_id } = req.params;
  if(swiper_id) {
      db.findUserById(swiper_id)
      .then(user => {
          if(user) {
              next();
          } else {
              res.status(404).json({ error: "Invalid swiper id" });
          }
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ error: "Server error getting user by id"})
      });
  } else {
      next();
  }
};

function validateSwipedId(req, res, next) {
  const { swiped_id } = req.params;
  if(swiped_id) {
      db.findUserById(swiped_id)
      .then(user => {
          if(user) {
              next();
          } else {
              res.status(404).json({ error: "Invalid swipee id" });
          }
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ error: "Server error getting user by id"})
      });
  } else {
      next();
  }
};