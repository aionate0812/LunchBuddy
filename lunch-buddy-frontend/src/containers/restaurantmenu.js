import React from 'react';
// import axios from 'axios';
import Food from '../components/menuitem'

class Menuview extends React.Component {
  constructor(props) {
    super(props) 
      this.state = {
        placedOrder:[],
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
  
    //clicker 
    //state of placeorder

  
  // ------------map through the dishes
  showDishes=(itemsOrdered)=>{
    return this.state.itemsOrdered.map((e,i)=>{
      return (
        console.log('stuff',e)
      )
    })
  }

  handleClicker=(e)=>{
    const {placedOrder}=this.state
   //  const{dish_id,name,price}=this.props 
    /* placedOrder.push({
       dishId: dish_id,
       nameofFood: name,
       foodPrice: price
     })*/
 
 //pass my clicker in here 
 if(!this.state.placedOrder.includes(e.target.value)){
   this.setState({placedOrder: this.state.placedOrder.concat(e.target.value)})
 }
 }

  handleClick=(e)=>{
    e.preventDefault();
  }

  render() {
    console.log('checked',this.state)
    // console.log("foodarray", this.showDishes())
    return (
      <>
     {
       this.state.itemsOrdered.map((e,i)=>{
         return <Food {...e} key={i} index={i} isClicking={this.handleClicker} /> 
       })
     } 

      <button type="button" className="btn btn-dark" onClick={this.handleClick}>Place Order</button>
     
      </>
    )
  }
}
export default Menuview
