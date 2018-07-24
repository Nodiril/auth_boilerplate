// Update with your config settings.
const path = require('path')

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'database_name',
      user: 'database_user',
      password: 'database_user_password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, '/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/seeds')
    },
    debug: true
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'database_name',
      user: 'database_user',
      password: 'database_user_password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, '/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/seeds')
    }
  }

}
