
exports.up = function(knex) {
    return knex.schema
    .createTable('users', users => {
        users.increments('user_id')
        .unique();
        users
        .string('name', 255)
        .notNullable();
        users
        .string('email', 255)
        .unique()
        .notNullable();
        users
        .string('password', 255)
        .notNullable();
        users
        .date('dob');
        users
        .string('gender', 255);
        users
        .string('coordinates', 255);
        users
        .string('location', 255);
        users
        .string('profile_img', 255);
        users
        .string('bio', 255);
      })
      .createTable('swipes', swipes => {
          swipes
          .integer('swiper_id')
          .unsigned()
          .notNullable()
          .references('user_id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
          swipes
          .integer('swiped_id')
          .unsigned()
          .notNullable()
          .references('user_id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
          swipes
          .boolean('requested')
          .notNullable()
          .defaultTo(false)
          swipes
          .boolean('declined')
          .notNullable()
          .defaultTo(false)
      })
      .createTable('friends', friends => {
          friends
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('user_id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
          friends
          .integer('friend_id')
          .unsigned()
          .notNullable()
          .references('user_id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      })
      .createTable('messages', messages => {
          messages.increments('message_id');
          messages
          .integer('from_id')
          .unsigned()
          .notNullable()
          .references('user_id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
          messages
          .integer('to_id')
          .unsigned()
          .notNullable()
          .references('user_id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
          messages
          .string('message', 255)
          .notNullable();
      })
      .createTable('hobbies', hobbies => {
          hobbies.increments('hobby_id');
          hobbies
          .string('name', 255)
          .unique()
          .notNullable();
      })
      .createTable('user_hobbies', user_hobbies => {
          user_hobbies
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('user_id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
          user_hobbies
          .integer('hobby_id')
          .unsigned()
          .notNullable()
          .references('hobby_id')
          .inTable('hobbies')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('user_hobbies')
    .dropTableIfExists('hobbies')
    .dropTableIfExists('messages')
    .dropTableIfExists('friends')
    .dropTableIfExists('swipes')
    .dropTableIfExists('users');
};
