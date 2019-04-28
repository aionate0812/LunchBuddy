import React from 'react'

class Food extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            placedOrder: [],
            dishId: '',
            nameofFood: '',
            foodPrice: ''
        }
    }

    //-----functions


    render() {
        const { name, price, index, isClicking } = this.props
        return (<>
            <div className='containInfo'>
                            <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <form>
                                        <div className="form-check">
                                            <input type="checkbox" value={`name: ${name}, price:${Number(price)}`} className="form-check-input" id={index} onClick={isClicking} />
                                            <label className="form-check-label" htmlFor={index}>
                                                <div className ="row">
                                                    <div className="col-11">
                                                        {name}
                                                    </div>
                                                    <div className="col-1" style={{color: "maroon"}}>
                                                        ${price}
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                </form>
                            </li>
                        </ul>
        </div>
        </>
        )
    }

}
export default Food

