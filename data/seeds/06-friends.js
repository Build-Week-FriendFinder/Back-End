
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('friends').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('friends').insert([
        {
          user_id: 2,
          friend_id: 1
        },
        {
          user_id: 1,
          friend_id: 2
        }
      ]);
    });
};
