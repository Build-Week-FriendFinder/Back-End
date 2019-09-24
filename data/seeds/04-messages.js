
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('messages').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([
        {
          from_id: 2,
          to_id: 1,
          message: "Hello, Bert."
        },
        {
          from_id: 1,
          to_id: 2,
          message: "*Grumpy noise*"
        }
      ]);
    });
};
