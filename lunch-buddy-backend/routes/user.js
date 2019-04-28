const express = require('express')
const userRouter = express.Router()

const UserService = require('../services/user')

userRouter.post('/', (req, res) => {
    const { email_or_username } = req.body

    if (email_or_username.includes('@')) {
        UserService.readUserbyEmail(email_or_username)
            .then(data => {
                res.json({ data })
            })
            .catch(err => {
                console.log(err.toString())
            })
    } else {
        UserService.readUserbyUsername(email_or_username)
            .then(data => {
                res.json({ data })
            })
            .catch(err => {
                console.log(err.toString())
            })
    }
})

userRouter.post('/create', (req, res) => {
    const { email, username } = req.body

    if (!email.includes('@')) {
        throw new error('please enter a valid email')
    }

    UserService.createUser(email, username)
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