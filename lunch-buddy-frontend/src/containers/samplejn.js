import React from 'react'

class Food extends React.Component{
  constructor(props){
    super(props)
    this.state={
      placedOrder:[],
      currentOrder:''
      
    }
  }

  //----functions
  selectingOrder=(e,idx)=>{
    const currentOrder=this.state.placedOrder[idx]
    let array=[...this.state.placedOrder];
    let index=array.indexOf(currentOrder)
    console.log('idx',idx)
    if(idx !==-1){
      array.splice(idx,1);
      this.setState({placedOrder:array})
    }
  }

//   <li className="list-group-item d-flex justify-content-between align-items-center">
//   {name}
// <div className='price'>{price}</div>
//   <span className="badge badge-primary badge-pill">x</span>
// </li>

  render(){
   const{name,price}=this.props 
   const {placedOrder,currentOrder}=this.state
   console.log('order',placedOrder)
    return (
      <>
        <div className='containInfo'>
          <ul className="list-group">
          
           {
            this.state.placedOrder.map((placedOrder,i)=>{
              let activeSelect='';
              if(placedOrder===this.state.currentOrder)activeSelect="acive"
              return (
              
              <>
              <li key={i} className={"list-group-item d-flex justify-content-between align-items-center"}>{placedOrder}
              {name}
              <div className='price'>{price}</div>
              <span className={"badge badge-primary badge-pill" + activeSelect} onClick={(e)=>this.selectingOrder(e,i)}>x</span>
             </li>
             </>

            )
           }) 
          } 
          </ul>
        </div>
      </>
      )
  }

}
export default Food