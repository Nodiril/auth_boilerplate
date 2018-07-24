import Bookshelf from '../db/connection'

class User extends Bookshelf.Model {
  get tableName () {
    return 'users'
  }

  get hasTimestamps () {
    return true
  }
}

// module.exports = Bookshelf.model('User', User)

export default Bookshelf.model('User', User)
