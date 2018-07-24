exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (t) => {
      // PK
      t.increments('id').primary()

      // Columns
      t.string('username').unique().notNullable()
      t.string('password').notNullable()
      t.timestamps()
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
}
