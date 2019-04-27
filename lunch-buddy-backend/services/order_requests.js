const db = require('./dbConnect')

const orderRequestsService = {}

orderRequestsService.createOrderRequest = (order_id, user_id) => {
    return db.one('INSERT INTO order_requests (order_id, user_id) VALUES (${order_id}, ${user_id}) RETURNING id', {order_id, user_id})
}

orderRequestsService.addOrderItems = (id, items, total) => {
    return db.none('UPDATE order_requests SET order_items = ${items}, total = ${total} WHERE id = ${id};')
}

module.exports = orderRequestsService