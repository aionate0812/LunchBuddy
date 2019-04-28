import React from 'react'
import axios from 'axios'
import healthyBackground from '../assets/healthy-lunch.jpg'

class UserLogin extends React.Component {
    state = {
        input: '',
        user_id: '',
        createUsername: '',
        createEmail: '',
        email: '',
        username: '',
        error: ''
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            this.props.history.push('/dashboard')
        } 
    }
    
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state)
    }

    handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:5000/user', {
            email_or_username: this.state.input
        })
            .then(res => {
                console.log(res)
                this.setState({
                    user_id: res.data.data.id,
                    email: res.data.data.email,
                    username: res.data.data.username
                })
            })
            .then(() => {
                console.log(this.state)
                localStorage.setItem('user', JSON.stringify(this.state))
            })
            .then(() => {
                this.props.history.push('/dashboard')
            })
            .catch(err => {
                this.setState({
                    error: err.toString()
                })
            })

    }

    render() {
        return (
            <>
                <br />
                <div className="col-xs-12 py-2 my-2" style={{ height: "40px", textAlign: "center", backgroundColor: "black", color: "white"}}>Please Login to Find Your Lunch Buddy</div>
                <div className='container my-auto' style={{fontFamily: "Arvo"}}>
                    <div className='row'>
                    <div className="col">
                    <img src={healthyBackground} alt="healthy lunch" style={{width: "100%"}}/>
                    </div>
                    <div className="col">
                        {
                            this.state.error
                        }
                        <div className="row">
                        <form style={{ 'width': '100%'}} className="mt-5">
                        <p style={{textAlign: "center"}}> Login</p>
                            <div className="input-group flex-nowrap my-3">
                            <div className="col-10">
                                <input type="text" name='input' className="form-control" placeholder="Enter Email Here" aria-label="Username or Email" aria-describedby="addon-wrapping" onChange={this.handleChange} />
                            </div>
                            <div className="col-2" style={{ 'textAlign': 'center' }}>
                                <button type="button" className="btn btn-success btn-lg" onClick={this.handleSubmit}>Login</button>
                            </div>
                            </div>
                        </form>
                        </div>
                        <div className="row">
                        {
                            this.state.error
                        }
                        <form style={{ 'width': '100%' }} >
                        <p style={{textAlign: "center"}}> Or Create An Account</p>
                            <div className="input-group flex-nowrap my-3">
                                <input type="text" name='createEmail' className="form-control" placeholder="foodLover@example.com" aria-label="Create Email" aria-describedby="addon-wrapping" onChange={this.handleChange} />
                                <input type="text" name='createUsername' className="form-control" placeholder="Enter Username" aria-label="Create Username" aria-describedby="addon-wrapping" onChange={this.handleChange} />
                            </div>
                            <div style={{ 'textAlign': 'center' }}>
                                <button type="button" className="btn btn-secondary btn-md" onClick={this.handleCreateSubmit}>Create Account</button>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                    <hr />
                </div>
            </>
        )
    }
}

export default UserLogin;