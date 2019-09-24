const db = require('../data/dbConfig.js');

module.exports = {
  addUser,
  findUser,
  findUserBy,
  findUserById,
};

function findUser() {
  return db('users').select('*');
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