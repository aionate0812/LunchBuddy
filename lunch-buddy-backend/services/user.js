const {db} = require('./dbConnect')

const UserService = {}

UserService.createUser = (email_or_username) => {
    return db.one('INSERT INTO users (email_or_username) VALUES (${email_or_username}) RETURNING id', { email_or_username })
}

UserService.getUserbyID = (id) => {
    return db.any('SELECT * from users where id = ${id}', { id })
}

module.exports = UserService