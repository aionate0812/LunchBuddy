const db = require('./dbConnect')

const UserService = {}

UserService.createUser = (email_or_username) => {
    db.one('INSERT INTO users (email_or_username) VALUES (${email_or_username}) RETURNING id', { email_or_username })
}

// UserService.getUserbyID = (email_or_username) => {
//    
// }

UserService.getUserbyEOU = (email_or_username) => {
    db.any('SELECT * from users where email_or_username = ${email_or_username}', { email_or_username})
}

module.exports = UserService