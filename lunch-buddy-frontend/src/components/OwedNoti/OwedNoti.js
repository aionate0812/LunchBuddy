import React from 'react'

class OwedNoti extends React.Component {

    state = {
        user: [],
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

   

    
    render() {
        console.log(this.state)
        return (
            <>
            <div className="card" style={{"width": "18rem", "textAlign": "center"}}>
                <div className="card-header">
                    People You Owe
                    </div>
                <ul className="list-group list-group-flush" >

                    {
                        this.state.peopleOwed.map((e, i ) => {
                            return (
                                <>
                            <li className="list-group-item" key={i}>{e.name} - ${e.amount}</li>
                            <button type="button" className="btn btn-outline-primary">Pay Now</button>
                            </>
                            )
                        })
                    }
                </ul>
                <div className="card-footer">
                    TOTAL OWED = 123.50
                    <button type="button" className="btn btn-outline-primary my-2">Pay Everyone Now</button>   
                </div>
            </div>
            </>
        )
    }
}

export default OwedNoti