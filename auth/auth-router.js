const router = require('express').Router();
const bcrypt = require('bcryptjs');

const db = require('./helpers');
const generateToken = require('./generateToken');
const { checkUserCreds, checkUserExists } = require('./middleware');

router.post('/register', checkUserCreds, checkUserExists, (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  console.log(user)

  db.addUser(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: "Server error adding user." });
    });
});

router.post('/login', (req, res) => {
  let { email, password } = req.body;

  db.findUserByEmail(email)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.name}!`,
          user_id: user.user_id,
          token
        });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: "Server error authenticating login." });
    });
});

module.exports = router;