const environment = 'development'
const config = require('./knexfile')[environment]

const knex = require('knex')(config)
const bookshelf = require('bookshelf')(knex)

bookshelf.plugin('registry')
bookshelf.plugin(require('bookshelf-modelbase').pluggable)

module.exports = bookshelf
