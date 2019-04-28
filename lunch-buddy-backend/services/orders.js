const db = require('./dbConnect')

const ordersService = {}


ordersService.createOrder = (order_id) => {
    return db.one('SELECT * FROM orders WHERE orders.id=$[order.id]', {order_id})
}

ordersService.createOrder = (user_id) => {
    return db.one('INSERT INTO orders (user_id) VALUES (${user_id}) RETURNING id', {user_id})
}

module.exports = orderService