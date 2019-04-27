const express = require('express')
const orderRequestsRouter = express.Router()

const orderRequestsService = require('../services/order_requests')

orderRequestsRouter.get('/:id', (req, res) => {
    const { id } = req.params

    orderRequestsService.getOrderRequestById(id)
    .then( order => {
        res.json({order})
    }, err => {
        res.json({msg:'Could not get order'})
        console.log(err)
    })
})

orderRequestsRouter.get('orders/:order_id', (req, res) => {
    const { order_id } = req.params

    orderRequestsService.getOrderRequestsByOrderId(order_id)
    .then( orderRequests => {
        res.json({order_requests:orderRequests})
    }, err => {
        res.json({msg:'Could not get orders'})
        console.log(err)
    })
})

orderRequestsRouter.get('/user/orders/:user_id', (req, res) => {
    const { user_id } = req.params

    // orderRequestsService.getOrderRequestsByUserId(user_id)
    // .then( orders => {
    //     orderIds = orders.map( order => {
    //         return 
    //     })
    // })
    
})

orderRequestsRouter.post('/', (req, res) => {
    const { order_id, user_id } = req.body

    orderRequestsService.createOrderRequest(order_id, user_id)
    .then( orderRequestId => {
        res.json({success:true, order_request_id:orderRequestId})
    }, err => {
        res.json({msg:'Could not create order request'})
        console.log(err)
    })
})

orderRequestsRouter.put('/', (req, res) => {
    const { order_items } = req.body

    total = 0 
    orderRequestsService.addOrderItems(order_items, total)
    .then( () => {
        res.json({success:true})
    }, err => {
        res.json({msg:'Could not update order request'})
        console.log(err)
    })
})

module.exports = orderRequestsRouter
