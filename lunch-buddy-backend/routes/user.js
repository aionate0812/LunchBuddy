const express = require('express')
const userRouter = express.Router()

const UserService = require('../services/user')

userRouter.post('/', (req, res) => {
    const { email_or_username } = req.body

    UserService.createUser(email_or_username)
        .then(data => {
            res.json({ data })
        })
        .catch(err => {
            console.log(err.toString())
        })
})

userRouter.get('/:id', (req, res) => {
    const { id } = req.params

    UserService.getUserbyID(id)
        .then(data => {
            res.json({ data })
        })
        .catch(err => {
            console.log(err.toString())
        })
})

module.exports = userRouter