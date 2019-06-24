exports.up = function(knex, Promise) {
    return knex.schema.createTable('roles',
      table => {
        table.increments();

        table
            .string('role', 128)
            .notNullable()
            .unique()
      })
  };
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('roles')
};