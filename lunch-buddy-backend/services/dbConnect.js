const pgp = require('pg-promise')({})
const db = pgp('postgres:localhost:5252/lunch_buddy')

module.exports = db

