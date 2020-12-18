
exports.up = function(knex) {
  return knex.schema.createTable('user', function(table) {
    table.increments();
    table.bigInteger('createdAt').notNullable();
    table.bigInteger('updatedAt').notNullable();
    table.string('username').notNullable();
    table.string('password').notNullable();
  })

};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
