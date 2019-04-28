const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 5000
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
// next line is the money
app.set('socketio', io);


const orderRequestsRouter = require('./routes/order_requests')
const userRouter = require('./routes/user')
const ordersRouter = require('./routes/orders')

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use('/orders', ordersRouter)
app.use('/order_request', orderRequestsRouter)
app.use('/user', userRouter)


app.get('/', (req, res) => {
    res.send('hello world')
})


// let interval;

// io.on('connection',  (socket) => {
//     console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 10000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
//   });

//   const getApiAndEmit = async socket => {
//     try {
//       socket.emit("FromAPI");
//     } catch (error) {
//       console.error(`Error: ${error.code}`);
//     }
//   };




server.listen(port, () => {
    console.log('server is running on port ' + port)
})