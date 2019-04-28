import React from 'react'
import {Redirect} from 'react-router-dom'


class Order extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: "",
        }
    }


    componentDidMount() {
        this.setState({
          user: JSON.parse(localStorage.getItem('user')) || null,
        })
      }

    handleClick = (e) =>{
        this.props.history.push('/search')
    }

    render() {
        console.log(this.state.user)
        return(
            <> {
                this.state.user !== null ?                 
                <div className="container-fluid" style={{margin: "auto auto"}}>
                <h3 >Today's A Good Day For A Delicious Meal With Friends</h3>
                <button type="button" class="btn btn-info" onClick={this.handleClick}>Create Order</button>
                </div> : <Redirect to='/'/>
            }
            </>
        )
    }
}

export default Order