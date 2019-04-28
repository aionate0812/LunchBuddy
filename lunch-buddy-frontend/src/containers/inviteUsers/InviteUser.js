import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios'

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

const createOrderRequest = (order_id, user_id) =>{
    return axios({
        method: "post",
        url: `${orderRequestEndpointBase}`,
        baseURL:root,
        data: {
            order_id: order_id,
            user_id: user_id
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
        
        const orderRequests = await getOrderRequestsByOrderId(this.props.match.params.id)
        console.log(orderRequests, this.props.match.params.id)
        this.setState({
            order_requests:orderRequests.data.order_requests, 
            order:this.props.match.params.id,
            user: JSON.parse(localStorage.getItem('user')) || null,
        })
        
    }

    handleOnChange = (e) => {
        this.setState({ input: e.target.value })
    }

    handleAdd = async (e) => {
        e.preventDefault();
        const user = await getUser(this.state.input)
        console.log(user.data.data.id)
        await createOrderRequest(this.state.order, user.data.data.id)
        const orderRequests = await getOrderRequestsByOrderId(this.props.match.params.id)
        console.log(orderRequests, this.props.match.params.id)
        this.setState({
            order_requests:orderRequests.data.order_requests, 
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
            <div className="container">
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
                    : null//<Redirect to='/' />
                }
                {
                    this.state.order_requests.map( (orderRequest, i) => {
                        return (
                            <li key={i}>
                                <span>{orderRequest.username}</span>
                                <ul>
                                    <li>{orderRequest.order_items?orderRequest.order_items:'No items yet!'}</li>
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