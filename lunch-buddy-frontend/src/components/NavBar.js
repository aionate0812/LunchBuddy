import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = props => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to='/'> Lunch Buddy </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/"> Home </Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/order"> Create Order </Link>
                        </li>
                    </ul>
                </div>
            </nav>

        </>
    )
}

export default NavBar