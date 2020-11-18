
exports.up = function(knex) {
  return knex.schema.createTable('arts', (tbl) => {
      tbl.increments()
      tbl.string('art_name', 256).notNullable()
      tbl.text('art_url').notNullable()
      tbl.integer('rating').notNullable()
      tbl.string('category', 128).notNullable()
      tbl.integer('users_id').notNullable()
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('arts')
};
