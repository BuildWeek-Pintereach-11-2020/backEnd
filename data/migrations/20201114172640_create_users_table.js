
exports.up = function(knex) {
    return knex.schema.createTable('users', (tbl) => {
        tbl.increments()
        tbl.string('email', 256).notNullable().unique()
        tbl.string('password', 256).notNullable().unique()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
