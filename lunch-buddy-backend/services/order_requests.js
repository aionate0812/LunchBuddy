const db = require('./dbConnect')

const orderRequestsService = {}

orderRequestsService.createOrderRequest = (order_id, user_id) => {
    return db.one('INSERT INTO order_requests (order_id, user_id) VALUES (${order_id}, ${user_id}) RETURNING id', {order_id, user_id})
}

orderRequestsService.addOrderItems = (id, items, total) => {
    return db.none('UPDATE order_requests SET order_items = ${items}, total = ${total} WHERE id = ${id};', {id, items, total})
}

orderRequestsService.getOrderRequestById = (id) => {
    return db.one('SELECT * FROM order_requests WHERE id = ${id}', {id})
}

orderRequestsService.getOrderRequestsByOrderId = (order_id) => {
    return db.one('SELECT * FROM order_requests WHERE order_id = ${order_id}', {order_id})
}

orderRequestsService.getOrderRequestsByUserId = (user_id) => {
    return db.many('SELECT * FROM order_requests WHERE user_id = ${user_id}', {user_id})
}

module.exports = orderRequestsService