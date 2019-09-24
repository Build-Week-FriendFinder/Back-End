
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('hobbies').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('hobbies').insert([
        {name: 'Reading'},
        {name: 'Living in a trashcan'},
        {name: 'Being tickled'},
        {name: "Eating cookies"},
        {name: 'Sleeping'}
      ]);
    });
};
