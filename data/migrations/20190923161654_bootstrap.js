
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments();
        users
        .string('name', 255)
        .notNullable();
        users
        .string('email', 255)
        .notNullable();
        users
        .string('password', 255)
        .notNullable();
        users
        .date('dob')
        .notNullable();
        users
        .string('coordinates', 255);
        users
        .string('location', 255);

      });
};

exports.down = function(knex) {
  
};
