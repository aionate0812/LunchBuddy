import React from 'react'

class UserLogin extends React.Component {
    state = {
        Username:'',
        error: ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state)
    }

    render() {
        return (
            <>
                <br/>
                <div className="col-xs-12" style={{ "height": "75px", "textAlign": "center" }}>Please Login to Find Your Lunch Buddy</div>
                <div className='container my-auto'>
                    <div className='row'>
                        <form style={{ 'width': '100%'}} >
                            <div className="input-group flex-nowrap my-3">

                                <input type="text" name='Username' className="form-control" placeholder="Enter Username Here" aria-label="Username" aria-describedby="addon-wrapping" onChange={this.handleChange} />
                            </div>
                            <div style={{'textAlign': 'center'}}>
                                <button type="button" className="btn btn-primary btn-md">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default UserLogin;