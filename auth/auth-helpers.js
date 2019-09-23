const db = require('../database/dbConfig.js');

module.exports = {
  addUser,
  findUser,
  findUserBy,
  findById,
};

function findUser() {
  return db('users').select('id', 'username', 'password');
}

function findUserBy(filter) {
  return db('users').where(filter);
}

async function addUser(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findUserById(id) {
  return db('users')
    .where({ id })
    .first();
}