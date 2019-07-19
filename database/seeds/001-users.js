
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
            "id": 1,
            "username": "thisispatrick",
            "password": "$2a$14$m5EPfrYoWSDmJWF9Dl8VsuUL.5YNmDHj7Bvyt55NzD6hpGXt6QfgG"
        },
        {
            "id": 2,
            "username": "patrick",
            "password": "$2a$14$W7FQvbjVd5.b8QdLWTwRXO8lf4hFBDT10JBKkl8A6AuTqTSztv5zq"
        },
        {
            "id": 3,
            "username": "mitsy",
            "password": "$2a$14$J9iT4uohdHNt8L6D.UjXpenES1sfG7hRE4diAqhAZr8.690eIurgi"
        }
    ]);
    });
};
