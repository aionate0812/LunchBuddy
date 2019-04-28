import React from 'react'

class Food extends React.Component{
  constructor(props){
    super(props)
    this.state={
      placedOrder:[],
      dishId:'',
      nameofFood:'',
      foodPrice:''
    }
  }

 //-----functions


  render(){
   const{name,price,index,isClicking}=this.props 

    return (
      <><form>
        <div className="form-check">
    <input type="checkbox" value={`name: ${name}, price:${price}`} className="form-check-input" id={index} onClick={isClicking}/>
    <label className="form-check-label" htmlFor={index}>
    {name} {price}
    </label>
  </div>
  </form>
      </>
      )
  }

}
export default Food

/*
        <div className='containInfo'>
          <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
              {name}
          <div className='price'>{price}</div>
          <input type='checkbox' onClick={this.handleClicker}/>
          </li>
          </ul>
        </div>
*/