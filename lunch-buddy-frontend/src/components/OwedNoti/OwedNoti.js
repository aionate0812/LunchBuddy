import React from 'react'

class OwedNoti extends React.Component {

    state = {
        peopleOwed: [
            {
                name: 'Mo',
                amount: 20
            },
            {
                name: 'Taq',
                amount: 100
            },
            {
                name: '{ TA }',
                amount: 3.50
            }
        ]
    }

    componentDidMount = async () => {

        // axios.get('http://localhost:5000/')
    }

    getTotal = () => {
        
    }

    render() {
        return (
            <div className="card" style={{"width": "18rem", "textAlign": "center"}}>
                <div className="card-header" style={{backgroundColor: "black", color: "white"}}>
                    People You Owe
                    </div>
                <ul className="list-group list-group-flush" >

                    {
                        this.state.peopleOwed.map((e, i ) => {
                            return (
                                <>
                            <li className="list-group-item">{e.name} - ${e.amount}</li>
                            <button type="button" className="btn btn-outline-success">Pay Now</button>
                            </>
                            )
                        })
                    }
                </ul>
                <div className="card-footer">
                    TOTAL OWED = 123.50
                    <button type="button" className="btn btn-outline-success my-2">Pay Everyone Now</button>   
                </div>
            </div>
        )
    }
}

export default OwedNoti