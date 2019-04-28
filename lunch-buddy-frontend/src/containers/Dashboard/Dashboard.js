import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const root = 'http://localhost:5000'
const orderRequestsEndpointBase = '/order_request/'
const ordersEndpointBase = '/orders/'

const getOrderInvitations = (user_id) => {
    return axios({
        url:`${orderRequestsEndpointBase}user/orders/${user_id}`,
        baseURL:root
    })
}

const getOrdersCreated = (user_id) => {
    return axios({
        url:`${ordersEndpointBase}user/${user_id}`,
        baseURL:root
    })
}


class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user:{},
            order_invitations:[],
            orders_created:[]
        }
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) {
            this.props.history.push('/')
        } else {
        const orderInvitations = await getOrderInvitations(user.user_id)
        const ordersCreated = await getOrdersCreated(user.user_id)
        this.setState({order_invitations:orderInvitations.data.orders, orders_created:ordersCreated.data.orders, user})
        }
    }

    render() {
        const {user, order_invitations, orders_created} = this.state
        return(
            <>
                <div className='container mt-5'>
                    <h1>Welcome {user.username}</h1>
                    <div className='mt-5'>
                        <h5>Order Invitations:</h5>
                        <ul className='mt-3'>
                            {
                                order_invitations.map( (order, i) => {
                                    const {id, order_name, restaurant_name, order_creator_name} = order
                                    return (
                                        <li key={i}>
                                            <Link to={`/order/${id}`}>{order_name}</Link>
                                            <ul>
                                                <li>{restaurant_name}</li>
                                                <li>{order_creator_name}</li>
                                            </ul>
                                        </li>
                                    ) 
                                })
                            }
                        </ul>
                    </div>
                    <div>
                        <h5>Orders Created:</h5>
                        <ul>
                            {
                                orders_created.map( (order, i) => {
                                    const {id, order_name, restaurant_name} = order
                                    return(
                                        <li key={i}>
                                            <Link to={`/order/${id}/invite`}>{order_name}</Link>
                                            <ul>
                                                <li>{restaurant_name}</li>
                                            </ul>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}

export default Dashboard