import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import OwedNoti from '../../components/OwedNoti/OwedNoti';

const root = 'http://zhost:5000'
const orderRequestsEndpointBase = '/order_request/'
const ordersEndpointBase = '/orders/'

const getOrderInvitations = (user_id) => {
    return axios({
        url: `${orderRequestsEndpointBase}user/orders/${user_id}`,
        baseURL: root
    })
}

const getOrdersCreated = (user_id) => {
    return axios({
        url: `${ordersEndpointBase}user/${user_id}`,
        baseURL: root
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
        console.log(ordersCreated)
        this.setState({order_invitations:orderInvitations.data.orders, orders_created:ordersCreated.data.orders, user})
        }
    }

    render() {
        const { user, order_invitations, orders_created } = this.state
        return (
            <>

                <div className='container mt-5'>
                <div className='row'>
                    <h1>Welcome {user.username}</h1>
                    <div aria-live="polite" aria-atomic="true" style={{ "position": "relative", "min-height": "0" }}>
                    <div style={{ "position": "absolute", "top": "0", "right": "0" }}>
                        <OwedNoti />
                     </div>
                </div>
                        <div className='row mt-4 justify-content-around'>
                            <div style={{height:'300px'}}>
                                <h5>Order Invitations:</h5>
                                <ul className='list-group mt-3'>
                                    {
                                        order_invitations.map( (order, i) => {
                                            const {id, order_name, restaurant_name, order_creator_name} = order
                                            return (
                                                <li className='list-group-item' key={i}>
                                                    <Link to={`/order/${id}`}>{order_name}</Link>
                                                    <ul>
                                                        <li><strong>Restaurant:</strong> {restaurant_name}</li>
                                                        <li><strong>Host:</strong> {order_creator_name}</li>
                                                    </ul>
                                                </li>
                                            ) 
                                        })
                                    }
                                </ul>
                            </div>
                            <div style={{height:'300px'}}>
                                <h5>Orders Created:</h5>
                                <ul className='list-group mt-3'>
                                {
                                    orders_created.map( (order, i) => {
                                        const {id, order_name, restaurant_name} = order
                                        return(
                                            <li className='list-group-item' key={i}>
                                                <Link to={`/order/${id}/invite`}>{order_name}</Link>
                                                <ul>
                                                    <li><strong>Restauranst</strong> {restaurant_name}</li>
                                                </ul>
                                            </li>
                                        )
                                    })
                                }
                                </ul>
                            </div>
                        </div>
                        </div>
                </div>
            </>
        )
    }
}



export default Dashboard