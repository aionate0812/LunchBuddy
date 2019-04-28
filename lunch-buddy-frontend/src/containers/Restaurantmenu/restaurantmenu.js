import React from 'react';
import axios from 'axios';
import Food from '../../components/menuitem'

class Menuview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      placedOrder: [],
      itemsOrdered: [
        {
          "dish_id": "108",
          "name": "Overboard Omelet",
          "price": 8.45
        },
        {
          "dish_id": "105",
          "name": "Block Breakfast Sandwich",
          "price": 6.5
        },
        {
          "dish_id": "104",
          "name": "Ensign Egg Platter",
          "price": 8
        },
        {
          "dish_id": "101",
          "name": "Fathom French Toast",
          "price": 7.5
        },
        {
          "dish_id": "102",
          "name": "Buccaneer BLT",
          "price": 7.5
        },
        {
          "dish_id": "103",
          "name": "Buoy Bagel with Cream Cheese",
          "price": 3
        }

      ]
    }
  }

componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      console.log('user',user)
        this.props.history.push(`/menuview/${user.user_id}`)

    }
   
}


  // ------------map through the dishes
  showDishes = (itemsOrdered) => {
    return this.state.itemsOrdered.map((e, i) => {
      return (
        console.log('stuff', e)
      )
    })
  }

  handleClicker = (e) => {
    const {placedOrder} = this.state
    let array=[...this.state.placedOrder];
    let index=array.indexOf(placedOrder)
    console.log("Index", index)
    if (!this.state.placedOrder.includes(e.target.value)) {
      this.setState({ placedOrder: this.state.placedOrder.concat(e.target.value) })
    }
    else {
      array.splice(index,1)
      this.setState({placedOrder: array})
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    
  }

  render() {

    console.log('placedorderStuff',this.state.placedOrder)
    /* id, order_id,user_id,order_items, total */
    return (
      <>
        <h2>Le Carte</h2>
        {
          this.state.itemsOrdered.map((e, i) => {
            return <Food {...e} key={i} index={i} isClicking={this.handleClicker} />
          })
        }
        <button type="button" className="btn btn-dark" onClick={this.handleClick}>Place Order</button>

      </>
    )
  }
}
export default Menuview
