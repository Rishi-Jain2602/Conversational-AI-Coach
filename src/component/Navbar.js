import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Navbar.css'
export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img
                            src={require('../static/ConvAI.JPG')}
                            alt="ConvAI Logo"
                            className="navbar-logo"
                        />
                        <span className="ms-2">ConvAI</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Chat Features
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/talkAI">AI Voice Chat</Link></li>
                                    <li><Link className="dropdown-item" to="/withAI">AI-Powered Duo Chat</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Improvements">Improvements</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Summary">Summary</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}