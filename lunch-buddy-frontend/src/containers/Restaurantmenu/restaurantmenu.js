import React from 'react';
// import axios from 'axios';
import Food from '../../components/menuitem'

class Menuview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      placedOrder: [],
      itemsOrdered: [
        {
          "dish_id": "108",
          "name": "papa a la vodka",
          "price": "149 Kč"
        },
        {
          "dish_id": "105",
          "name": "potato potatoe",
          "price": "149 million"
        },
        {
          "dish_id": "104",
          "name": "pizza fries",
          "price": "156 thousand"
        }
      ]
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

//  ? :
/* 
function getUser(user==user){
  return (username? "username": "user not logged in")
}
*/

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
