const db = require('./dbConnect')

const UserService = {}

UserService.createUser = (email_or_username) => {
    return db.one('INSERT INTO users (email_or_username) VALUES (${email_or_username}) RETURNING id', { email_or_username })
}

UserService.getUserbyID = (id) => {
    return db.any('SELECT * from users where id = ${id}', { id })
}

UserService.readUserbyEmail = (email_or_username) => {
    return db.one('SELECT * from users WHERE email=${email_or_username}', { email_or_username})
}

UserService.readUserbyUsername = (email_or_username) => {
    return db.one('SELECT * from users WHERE username=${email_or_username}', { email_or_username })
}

module.exports = UserService