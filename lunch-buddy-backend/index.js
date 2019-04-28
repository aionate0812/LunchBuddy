const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 5000


const orderRequestsRouter = require('./routes/order_requests')
const userRouter = require('./routes/user')
const ordersRouter = require('./routes/orders')
const restaurantsRouter = require('./services/restaurants');
const menuRouter = require('./services/menu');
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/orders', ordersRouter)
app.use('/user', userRouter)
app.use('/order_request', orderRequestsRouter)
app.use('/locations', restaurantsRouter)
app.use('/menu', menuRouter)
app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log('server is running on port ' + port)
})