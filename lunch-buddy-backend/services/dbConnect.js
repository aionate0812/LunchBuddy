const pgp = require('pg-promise')({})
const config = require('../config.json')
const db = pgp(config.database_url)

module.exports = db

