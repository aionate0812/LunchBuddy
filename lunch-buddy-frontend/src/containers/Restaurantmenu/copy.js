import React from 'react';
// import axios from 'axios';
import Food from '../../components/copy'
import axios from 'axios';

const port = 5000

const menu = (res_id) =>{
  return axios({
    method: "get", 
    url: `https://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1/dailymenu`,
    params: {
      res_id: 16774318
    },
    headers: { 'user-key': 'cd295cc49e5c8dfd776d34174be1b9af' }
  })
}


/*onst menu = (res_id) =>{
    console.log("Pl", res_id)
    return axios({
        method: "get",
        url: `http://localhost:${port}/menu`,
        data: {
            res_id: res_id,
        }
    })
  }*/


class Menuview extends React.Component {
  constructor(props) {
    super(props) 
      this.state = {
        placedOrder:[],
        items: [
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
        this.setState({user: JSON.parse(localStorage.getItem('user')) || null});
        /*const num = Number(this.props.match.params.id)
        const str = this.props.match.params.id
        menu(str)
        .then((response)=>{
          console.log(response)
            /*this.setState({items: response.data.daily_menus})
        })
        .catch((e)=>{
            console.log("Error", e)
        })*/
        
    }

  handleClicker=(e)=>{
    const {placedOrder}=this.state

    let array=[...this.state.placedOrder];
    let index=array.indexOf(placedOrder)
    if(!this.state.placedOrder.includes(e.target.value)){
        this.setState({placedOrder: this.state.placedOrder.concat(e.target.value)})
      }
    else {
      array.splice(index,1);
      this.setState({placedOrder:array})
    }
 
 }


  render() {
    console.log("State", this.state)
     return (
      <>
      <h2>Le Carte</h2>
     {
       this.state.items.length > 0 ? this.state.items.map((e,i)=>{
         return <Food {...e} key={i} index={i} isClicking={this.handleClicker} />
       }) : null
     } 
      <button type="button" className="btn btn-dark" onClick={this.handleClick}>Place Order</button>
     
      </>
    )
  }
}
export default Menuview
