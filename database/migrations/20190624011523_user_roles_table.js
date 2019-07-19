
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user_roles', table => {
        table.increments();

        table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        
        table
        .integer('role_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        
      })
  };
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user_roles')
};
