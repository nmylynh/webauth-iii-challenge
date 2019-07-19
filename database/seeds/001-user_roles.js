
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_roles').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user_roles').insert([
        {
            "id": 1,
            "user_id": 1,
            "role_id": 3
        },
        {
            "id": 2,
            "user_id": 3,
            "role_id": 3
        },
        {
            "id": 4,
            "user_id": 3,
            "role_id": 1
        },
        {
            "id": 5,
            "user_id": 1,
            "role_id": 1
        },
        {
            "id": 6,
            "user_id": 1,
            "role_id": 2
        }
    ]);
    });
};
