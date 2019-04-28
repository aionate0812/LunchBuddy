const db = require('./dbConnect')

const ordersService = {}


ordersService.readOrder = (order_id) => {
    return db.oneOrNone('SELECT orders.*, users.username AS order_creator_name FROM orders INNER JOIN users ON orders.order_creator = users.id WHERE orders.id=$[order_id]', {order_id})
}

ordersService.getAllOrdersFromUser = (user_id) => {
    return db.manyOrNone('SELECT * FROM orders WHERE order_creator=${user_id}', {user_id})
}

ordersService.createOrder = (user_id) => {
    return db.oneOrNone('INSERT INTO orders (user_id) VALUES (${user_id}) RETURNING id', {user_id})
}

module.exports = ordersService