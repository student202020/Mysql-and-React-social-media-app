import React from "react"
import { useGlobalContext } from "../context";
import {Link, useNavigate} from "react-router-dom"
import "./Navbar.css"

export const Navbar = () => {

    const {currentUser, logout } = useGlobalContext()
    const navigate = useNavigate()
    const logout1 = () => {
      logout()
      navigate("/")
    }
    return(
        <div className="frame">
      {!currentUser && <Link to="/register"><h6>Register</h6></Link>}
      {!currentUser && <Link to="/login"><h6>Login</h6></Link>}
      {currentUser  && <button onClick={logout1}>Logout</button>}
   
        </div>
    )
}
export default  Navbar;