import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios'

const port = 5000

const createOrderRequest = (order_id, user_id) =>{
    return axios({
        method: "posts",
        url: `http://localhost:${port}/order_request/`,
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
    }

    componentDidMount() {
                this.setState({
                    order: this.props.match.url.split('/')[2],
                    user: JSON.parse(localStorage.getItem('user')) || null,
                })
    }

    handleOnChange = (e) => {
        this.setState({ input: e.target.value })
    }

    handleAdd = (e) => {
        e.preventDefault();
        this.setState({
            invitees: this.state.invitees.concat(this.state.input),
            input: ""
        })
    }
  
    handleSubmit = (e) => {
        this.state.invitees.forEach((e,i)=>{
            createOrderRequest(this.state.order, e)
            .then(()=>{
                this.setState({confirmed: this.state.confirmed++})
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
                            <div class="form-group">
                            <div className="row">
                            <div className="col-10">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" value={this.state.input} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleOnChange}/>
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div  className="col-2" style={{margin: "auto 0"}}>
                            <button type="submit" class="btn btn-primary" onClick={this.handleAdd}>Add</button>
                            </div>
                            </div>
                            <button type="submit" class="btn btn-primary mt-3">Submit</button>
                            </div>
                        </form> 
                    : <Redirect to='/' />
                }
                {
                    this.state.invitees.length>0 ? this.state.invitees.map((e,i)=>{
                        return <div className="row">
                        <div className="col mx-5 my-2">
                            <p> Invitee {i+1} : {e}</p>
                        </div>
                        </div>
                    }) : null
                }
            </div>
        )
    }
}

export default InviteUsers;