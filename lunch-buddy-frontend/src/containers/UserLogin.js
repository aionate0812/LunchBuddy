import React from 'react'
import axios from 'axios'
import background from '../assets/healthy-lunch.jpg'

class UserLogin extends React.Component {
    state = {
        input: '',
        user_id: '',
        email: '',
        username: '',
        error: ''
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
                <div className="col-xs-12 py-2" style={{ height: "40px", textAlign: "center", backgroundColor: "black", color: "white"}}>Please Login to Find Your Lunch Buddy</div>
                <div className='container my-auto' style={{fontFamily: "Arvo"}}>
                    <div className='row'>
                    {
                     this.state.error   
                    }
                        <form style={{ 'width': '100%' }} >
                            <div className="input-group flex-nowrap my-3">
                            <div className="col-8">
                                <input type="text" name='input' className="form-control" placeholder="Enter Username or Email Here" aria-label="Username or Email" aria-describedby="addon-wrapping" onChange={this.handleChange} />
                            </div>
                            <div className="col-4" style={{ 'textAlign': 'center' }}>
                                <button type="button" className="btn btn-success btn-lg" onClick={this.handleSubmit}>Login</button>
                            </div>
                            </div>
                        </form>
                        <img src={background} alt="healthy lunch" style={{width: "100%"}}/>
                    </div>
                </div>
            </>
        )
    }
}

export default UserLogin;