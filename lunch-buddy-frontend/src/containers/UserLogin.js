import React from 'react'
import axios from 'axios'

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

<<<<<<< HEAD
    }

    handleCreateSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:5000/user/create', {
            username: this.state.createUsername,
            email: this.state.createEmail
        })
            .then(res => {
                console.log(res)
                this.setState({
                    user_id: res.data.data.id,
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
=======
>>>>>>> master
    }

    render() {
        return (
            <>
                <br />
                <div className="col-xs-12" style={{ "height": "75px", "textAlign": "center" }}>Please Login to Find Your Lunch Buddy</div>
                <div className='container my-auto'>
                    <div className='row'>
                        {
                            this.state.error
                        }
                        <form style={{ 'width': '100%' }} >
                            <div className="input-group flex-nowrap my-3">

                                <input type="text" name='input' className="form-control" placeholder="Enter Username or Email Here" aria-label="Username or Email" aria-describedby="addon-wrapping" onChange={this.handleChange} />
                            </div>
                            <div style={{ 'textAlign': 'center' }}>
                                <button type="button" className="btn btn-primary btn-md" onClick={this.handleSubmit}>Login</button>
                            </div>
                        </form>
                    </div>
                    <hr />
                </div>
                <br />
                <div className="col-xs-12" style={{ "height": "75px", "textAlign": "center" }}>Or Create An Account</div>
                <div className='container my-auto'>
                    <div className='row'>
                        {
                            this.state.error
                        }
                        <form style={{ 'width': '100%' }} >
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
            </>
        )
    }
}

export default UserLogin;