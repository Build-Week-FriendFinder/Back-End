
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('swipes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('swipes').insert([
        {
          swiper_id: 2,
          swiped_id: 1,
          requested: true,
          declined: false
        },
        {
          swiper_id: 1,
          swiped_id: 2,
          requested: true,
          declined: false
        },
        {
          swiper_id: 3,
          swiped_id: 1,
          requested: true,
          declined: false
        },
        {
          swiper_id: 1,
          swiped_id: 3,
          requested: false,
          declined: true
        },
      ]);
    });
};
