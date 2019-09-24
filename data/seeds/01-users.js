
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          user_id: 1,
          name: 'Bertrand',
          email: 'bert@email.com',
          password: 'Ernie4ever',
          dob: '1978-10-30',
          gender: 'Male',
          coordinates: null,
          location: 'Sesame Street',
          profile_img: null,
          bio: "This is my bio."
        },
        {
          user_id: 2,
          name: 'Ernest',
          email: 'ernie@email.com',
          password: 'Cookies4ever',
          dob: '1979-2-20',
          gender: 'Male',
          coordinates: null,
          location: 'Sesame Street',
          profile_img: null,
          bio: "This is my bio, Bert."
        },
        {
          user_id: 3,
          name: 'Elmortimer',
          email: 'elmo@email.com',
          password: 'Tickles4ever',
          dob: '1981-8-15',
          gender: 'Male',
          coordinates: null,
          location: 'Sesame Street',
          profile_img: null,
          bio: "This is my bio."
        },
        {
          user_id: 4,
          name: 'Oscar',
          email: 'oscar@email.com',
          password: 'Trash4ever',
          dob: '1972-12-28',
          gender: 'Male',
          coordinates: null,
          location: 'Trash Can',
          profile_img: null,
          bio: "This is my bio."
        }
      ]);
    });
};
