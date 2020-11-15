
exports.up = function(knex) {
  return knex.schema.createTable('news', (tbl) => {
      tbl.increments()
      tbl.string('art_name', 256).notNullable().unique()
      tbl.string('art_url').notNullable().unique()
      tbl.integer('rating').notNullable().unique()
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
  return knex.schema.dropTableIfExists('news')
};
