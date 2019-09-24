
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_hobbies').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user_hobbies').insert([
        {
          user_id: 1,
          hobby_id: 5
        },
        {
          user_id: 2,
          hobby_id: 4
        },
        {
          user_id: 3,
          hobby_id: 1
        },
        {
          user_id: 3,
          hobby_id: 3
        },
        {
          user_id: 4,
          hobby_id: 2
        },
      ]);
    });
};
