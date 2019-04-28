const express = require('express')
const orderRequestsRouter = express.Router()

const orderRequestsService = require('../services/order_requests')
const ordersService = require('../services/orders')

const admin = require('firebase-admin');

const serviceAccount = require('../lunch-buddy-firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();




orderRequestsRouter.get('/:id', (req, res) => {
    const { id } = req.params

    var orderRequest = db.collection('order_requests').doc(id);
    var getDoc = orderRequest.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data());
          res.json({order_request:doc.data()})
        }
      })
      .catch(err => {
          res.json({msg:'Could not get order'})
        console.log('Error getting document', err);
      });

//     const orderRequests = db.collection('order_requests');
//     var query = orderRequests.where('order_id', '==', 1).get()
//     .then(snapshot => {
//     if (snapshot.empty) {
//       console.log('No matching documents.');
//       return;
//     }  

//     snapshot.forEach(doc => {
//       console.log(doc.id, '=>', doc.data());
//     });
//   })
//   .catch(err => {
//     console.log('Error getting documents', err);
//   });


    // orderRequestsService.getOrderRequestById(id)
    // .then( order => {
    //     res.json({order})
    // }, err => {
    //     res.json({msg:'Could not get order'})
    //     console.log(err)
    // })
})

orderRequestsRouter.get('/orders/:order_id', (req, res) => {
    const { order_id } = req.params

    const orderRequests = db.collection('order_requests');
    const query = orderRequests.where('order_id', '==', order_id).get()
    .then(snapshot => {
    if (snapshot.empty) {
      res.json({orders:[]})
      return;
    }  

    ordersArr = []
    snapshot.forEach(doc => {
        ordersArr.push({order_id:doc.id, ...doc.data()})
    })
    console.log('orders were hit')
    res.json({orders:ordersArr})
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });

  

    // orderRequestsService.getOrderRequestsByOrderId(order_id)
    // .then( orderRequests => {
    //     res.json({order_requests:orderRequests})
    // }, err => {
    //     res.json({msg:'Could not get orders'})
    //     console.log(err)
    // })
})

orderRequestsRouter.get('/user/orders/:user_id', async (req, res) => {
    const { user_id } = req.params
    console.log(user_id)
    const orderRequests = db.collection('order_requests');
    const query = orderRequests.where('user_id', '==', user_id).get()
    .then(snapshot => {
        console.log(snapshot)
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  

    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });

  

    // const orders = await orderRequestsService.getOrderRequestsByUserId(user_id)
    // console.log(orders)
    // const orderIds = orders.map( order => {
    //     return ordersService.readOrder(order.order_id)
    // })
    // Promise.all(orderIds)
    // .then( allOrders => {
    //     res.json({orders:allOrders})
    // }, err => {
    //     res.json({msg:'Could not get any orders'})
    //     console.log(err)
    // })
    
})

orderRequestsRouter.post('/', (req, res) => {
    const { order_id, user_id, username } = req.body

    var docRef = db.collection('order_requests').add({
        order_id,
        user_id,
        username,
        order_items:null,
        total:null
      });
    // orderRequestsService.createOrderRequest(order_id, user_id)
    // .then( orderRequestId => {
    //     res.json({success:true, order_request_id:orderRequestId})
    // }, err => {
    //     res.json({msg:'Could not create order request'})
    //     console.log(err)
    // })
})

orderRequestsRouter.put('/:order_id', (req, res) => {
    const {order_id} = req.params
    const { order_items } = req.body
    const total = 0
    const orderRequests = db.collection('order_requests').doc(order_id);
    var updateSingle = orderRequest.update({order_items, total});

    // total = 0 
    // orderRequestsService.addOrderItems(order_items, total)
    // .then( () => {
    //     res.json({success:true})
    // }, err => {
    //     res.json({msg:'Could not update order request'})
    //     console.log(err)
    // })
})

module.exports = orderRequestsRouter
