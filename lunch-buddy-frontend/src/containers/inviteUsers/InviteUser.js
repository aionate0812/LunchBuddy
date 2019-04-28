import React from 'react';
import axios from 'axios'
import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyDLXuWNECdHcAVOINQMVYNeVQkmT62avpI",
    authDomain: "lunch-buddy-f49d0.firebaseapp.com",
    databaseURL: "https://lunch-buddy-f49d0.firebaseio.com",
    projectId: "lunch-buddy-f49d0",
    storageBucket: "lunch-buddy-f49d0.appspot.com",
    messagingSenderId: "193579430030"
  };
  firebase.initializeApp(config);
  
  var db = firebase.firestore();

const root = 'http://localhost:5000'
const orderRequestEndpointBase = '/order_request/'
const userEndpointBase = '/user/'

const getUser = (email) => {
    return axios({
        method:'post',
        url:userEndpointBase,
        baseURL:root,
        data:{
            email_or_username:email
        }
    })
}

const getOrderRequestsByOrderId = (order_id) => {
    return axios({
        url:`${orderRequestEndpointBase}orders/${order_id}`,
        baseURL:root,
    })
}

const createOrderRequest = (order_id, user_id, username) =>{
    return axios({
        method: "post",
        url: `${orderRequestEndpointBase}`,
        baseURL:root,
        data: {
            order_id: order_id,
            user_id: user_id,
            username:username
        }
    })
}



class InviteUsers extends React.Component {
    state = {
        resultsFound: 0,
        order: 0,
        results: [],
        user: "",
        invitees: [],
        input: "",
        confirmed: 0,
        order_requests:[]
    }

    async componentDidMount() {
        
        // var orderRequestsWatcher = database.ref('order_requests')
        // orderRequestsWatcher.on('value', (snapshot)=>{
        // console.log(snapshot.val());
        // })

        db.collection("order_requests").where("order_id", "==", this.props.match.params.id)
        .onSnapshot(function(querySnapshot) {
        var orders = [];
        querySnapshot.forEach(function(doc) {
            orders.push(doc.data());
        });
        console.log("Current orders ", orders);
    });

        const orderRequests = await getOrderRequestsByOrderId(this.props.match.params.id)
        console.log(orderRequests, this.props.match.params.id)
        this.setState({
            order_requests:orderRequests.data.orders, 
            order:this.props.match.params.id,
            user: JSON.parse(localStorage.getItem('user')) || null,
        }, ()=>{
            console.log(this.state)
        })
        
    }

    handleOnChange = (e) => {
        this.setState({ input: e.target.value })
    }

    handleAdd = async (e) => {
        e.preventDefault();
        const user = await getUser(this.state.input)
        createOrderRequest(this.state.order, user.data.data.id, user.data.data.username)
        const orderRequests = await getOrderRequestsByOrderId(this.props.match.params.id)
        console.log(orderRequests, this.props.match.params.id)
        this.setState({
            order_requests:orderRequests.data.orders, 
            input: ""
        })
        
    }
  
    handleSubmit = (e) => {
        this.state.invitees.forEach((e,i)=>{
            createOrderRequest(this.state.order, e)
            .then(()=>{
                let confirmed = this.state.confirmed
                this.setState({confirmed: confirmed++})
            })
            .then(()=>{
                if(this.state.counter === 5){
                    this.props.history.push('/dashboard')
                }
            })
        })
    }


    render() {
        return (
            <div className="container mt-5">
                {
                    this.state.user !== null ?
                        <form>
                            <div className="form-group">
                            <div className="row">
                            <div className="col-10">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" value={this.state.input} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleOnChange}/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div  className="col-2" style={{margin: "auto 0"}}>
                            <button type="submit" className="btn btn-primary" onClick={this.handleAdd}>Add</button>
                            </div>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">Submit</button>
                            </div>
                        </form> 
                    : null
                }
                {
                    this.state.order_requests.map( (orderRequest, i) => {
                        return (
                            <li key={i}>
                                <span>{orderRequest.username}</span>
                                <ul>
                                    {/*<li>{orderRequest.order_items?orderRequest.order_items:'No items yet!'}</li>*/}
                                </ul>
                            </li>
                        )
                    })
                }
            </div>
        )
    }
}

export default InviteUsers;