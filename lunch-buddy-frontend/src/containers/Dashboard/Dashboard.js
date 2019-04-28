import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import OwedNoti from '../../components/OwedNoti/OwedNoti';

const root = 'http://localhost:5000'
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
            user: { username: 'Alex' },
            order_invitations: [],
            orders_created: [{ id: 1, name: 'Taco Tuesday', restaurant_name: 'Tacos Trejo', order_creator_name: 'Alex', }]
        }
    }

    async componentDidMount() {
        // const user = localStorage.getItem('user')
        const orderInvitations = await getOrderInvitations(2)
        const ordersCreated = await getOrdersCreated(2)
        this.setState({ order_invitations: orderInvitations.data.orders, orders_created: ordersCreated.data.orders })

    }

    render() {
        const { user, order_invitations, orders_created } = this.state
        return (
            <>


                <div className='container mt-5'>
                <div className='row'>
                    <h1>Welcome {user.username}</h1>
                </div>      
                    <div aria-live="polite" aria-atomic="true" style={{ "position": "relative", "min-height": "0" }}>
                        <div style={{ "position": "absolute", "top": "0", "right": "0" }}>
                            <OwedNoti />
                         </div>
                    </div>

                    <div className='row mt-5'>
                        <h5>Order Invitations:</h5>
                        <ul className='mt-3'>
                            {
                                order_invitations.map((order, i) => {
                                    const { id, order_name, restaurant_name, order_creator_name } = order
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


                    <div className=''>
                        <h5>Orders Created</h5>
                        <ul>
                            {
                                orders_created.map((order, i) => {
                                    const { id, order_name, restaurant_name } = order
                                    return (
                                        <li key={i}>
                                            <Link to={`/order/${id}`}>{order_name}</Link>
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