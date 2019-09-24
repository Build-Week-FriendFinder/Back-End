const db = require('../data/dbConfig.js');

module.exports = {
  addUser,
  findUsers,
  findUserBy,
  findUserById,
  updateUser,
  getUserHobbies,
  findHobbyByName,
  findHobbyById,
  addUserHobby,
  addHobbyToUser,
  removeUser,
  removeHobbyFromUser,
  Decline,
  Request
};

function findUsers() {
  return db('users').select('*');
}

function findUserBy(filter) {
  return db('users').where(filter);
}

async function addUser(user) {
  const [user_id] = await db('users').insert(user);

  return findUserById(user_id);
}

function findUserById(user_id) {
  return db('users')
    .where({ user_id })
    .first();
}

function getUserHobbies(id) {
  return db('hobbies as h')
  .join('user_hobbies as uhob', 'uhob.hobby_id', 'h.hobby_id')
  .join('users as u', 'u.user_id', 'uhob.user_id')
  .select('h.name as UserHobbies')
  .where('u.user_id', id);
}

function findHobbyByName(name) {
  return db('hobbies').where({ name }).first();
}

function findHobbyById(hobby_id) {
  return db('hobbies')
  .where({ hobby_id })
  .first();
}

function addUserHobby(user_id, hobby_id) {
  const userHobby = {
    user_id: user_id,
    hobby_id: hobby_id
  }
  return db('user_hobbies').insert(userHobby);
}

async function addHobbyToUser(user_id, hobby) {
  const [hobby_id] = await db('hobbies').insert(hobby);

  addUserHobby(user_id, hobby_id);
}

function updateUser(user_id, changes) {
  return db('users')
    .where({ user_id })
    .update(changes);
}

function removeUser(user_id) {
  return db('users')
    .where({ user_id })
    .del();
}

function removeHobbyFromUser(user_id, hobby_id) {
  return db('user_hobbies')
  .where({ user_id, hobby_id })
  .del();
}

function Decline(swiper_id, swiped_id) {
  const newSwipe = {
    swiper_id: swiper_id,
    swiped_id: swiped_id,
    requested: 0,
    declined: 1
  }
  return db('swipes').insert(newSwipe);
}

function Request(swiper_id, swiped_id) {
  const newSwipe = {
    swiper_id: swiper_id,
    swiped_id: swiped_id,
    requested: 1,
    declined: 0
  }
  return db('swipes').insert(newSwipe);
}

// function removeDeclined()