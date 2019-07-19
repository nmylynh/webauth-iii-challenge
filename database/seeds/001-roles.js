
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {
            "id": 1,
            "role": "student"
        },
        {
            "id": 2,
            "role": "instructor"
        },
        {
            "id": 3,
            "role": "admin"
        },
        {
            "id": 4,
            "role": "user"
        }
    ]);
    });
};
