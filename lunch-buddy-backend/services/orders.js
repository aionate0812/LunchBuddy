const db = require('./dbConnect')

const ordersService = {}


ordersService.readOrder = (order_id) => {
    return db.one('SELECT orders.*, users.username AS order_creator_name FROM orders INNER JOIN users ON orders.order_creator = users.id WHERE orders.id=$[order_id]', {order_id})
}

ordersService.createOrder = (user_id) => {
    return db.one('INSERT INTO orders (user_id) VALUES (${user_id}) RETURNING id', {user_id})
}

module.exports = ordersService