import React, { Component } from 'react'

class UserLogin extends React.Component {
    state = {
        email: ''
    }

    // handleChange = (e) => {
    //     this.setState({ [e.target.name]: e.target.value })
    // }

    render () {
        return(
            <h1>User Login</h1>
        )
    }
}

export default UserLogin;