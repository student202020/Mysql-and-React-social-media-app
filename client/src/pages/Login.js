import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import "./Login.css"

export default function Login(){

    const [user, setUser] = React.useState({
       username:"",
       password:"",
       
    })
    const {login} = useGlobalContext()
    const [err, setErr] = React.useState("")

    const navigate = useNavigate()

    

    

    const handleChange = (e) => {
        e.preventDefault()
        setUser(prevValue => ({...prevValue, [e.target.name]: e.target.value}))
        
    }
    const handleSubmit = async (e) =>{
        e.preventDefault() 
       
        try {
           await login(user)
          } catch (err) {
            setErr(err.response.data);
          }
          navigate("/")
        };
    return(
        <div className="authframe">
        <div className="auth">
   
         <input type="text"
        placeholder="username"
        name="username"
        onChange={handleChange}
        />
         <input type="password"
        placeholder="password"
        name="password"
        onChange={handleChange}
        />
       
        <button onClick={handleSubmit}>Save</button>
        </div>
        </div>
    )
}