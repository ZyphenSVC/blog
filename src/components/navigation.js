import React from "react"
import { Link } from "gatsby"
import DarkModeToggle from "./dark-mode-toggle"

import circleprofilepic from "../img/circleprofilepic.png"

class Navigation extends React.Component {
    render() {
        return (
            <div className="container py-5">
                <nav className="main-navbar d-flex flex-md-row flex-column navbar navbar-expand navbar-custom">
                    <span className="navbar-brand main-color-title"><img src={circleprofilepic} width="48" height="48" className="main-circle align-middle me-3" alt="Icon" />ZyphenSVC</span>
                    <div className="d-flex flex-row">
                        <Link className="nav-link" to="/">/home</Link>
                        <Link className="nav-link" to="/posts">/posts</Link>
                        <Link className="nav-link" to="/studies">/studies</Link>
                        <Link className="nav-link" to="/telugu/unit1">/telugu</Link>
                        <Link className="nav-link" to="/contact">/contact</Link>
                        <DarkModeToggle />
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navigation
