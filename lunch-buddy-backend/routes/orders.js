const express = require('express')
const ordersRouter = express.Router()

const ordersRouterService = require('../services/orders')

ordersRouter.get('/:order_id', (req, res) => {
    const {order_id} = req.params

    ordersRouterService.readOrder(order_id)
    .then( order => {
        res.json({order})
    }, err => {
        res.json({msg:'Could not retrieve order'})
        console.log(err)
    })
})

ordersRouter.get('/user/:user_id', (req, res) => {
    const {user_id} = req.params
    console.log('orders was hit!!')
    ordersRouterService.getAllOrdersFromUser(user_id)
    .then( orders => {
        res.json({orders})
    }, err => {
        res.json({mgs:'Could not get orders'})
        console.log(err)
    })
})

ordersRouter.post('/', (req, res) => {
    const { user_id } = req.body

    ordersRouterService.createOrder(user_id)
    .then( orderId => {
        res.json({success:true, order_id:orderId})
    }, err => {
        res.json({msg:'Could not create order'})
        console.log(err)
    })
})



module.exports = ordersRouter
