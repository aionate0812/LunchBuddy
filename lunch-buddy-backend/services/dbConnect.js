const pgp = require('pg-promise')({})
const db = pgp('postgres:localhost:5252/order_requests')

module.exports = db

