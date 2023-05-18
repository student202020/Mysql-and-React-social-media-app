import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"

export default function Register(){

    const [user, setUser] = React.useState({
       email: "",
       username:"",
       password:"",
       name:""
    })
    const [err, setErr] = React.useState("")

    const navigate = useNavigate()

    const [file, setFile] = React.useState(null)
   

    const upload = async() => {
     const formData = new FormData()
     formData.append("file", file)
     const res = await axios.post("http://localhost:5500/api/upload", formData, {withCredentials:true})
     return  res.data 
    }

    const handleChange = (e) => {
        e.preventDefault()
        setUser(prevValue => ({...prevValue, [e.target.name]: e.target.value}))
        
    }
    const handleSubmit = async (e) =>{
        e.preventDefault() 
        const imgUrl = await upload()
        try {
            if(user.name === "" || user.email === "" || user.username === "" || user.password === "" )
            {return}
            await axios.post("http://localhost:5500/api/auth/register", {
            email: user.email,
            username: user.username,
            password: user.password,
            name: user.name,
            userImage: file ? imgUrl.filename : ""

            }, {withCredentials: true});
            navigate("/login")
          } catch (err) {
            setErr(err.response.data);
          }

        };
    return(
        <div className="authframe">
        <form encType="multipart/form-data" onSubmit={handleSubmit} className="auth" >
        <input type="email"
        placeholder="enail"
        name="email"
        onChange={handleChange}
        />
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
         <input type="text"
        placeholder="name"
        name="name"
        onChange={handleChange}
        />
         <input type="file"
         name=""
        id="file"
        style={{display:"none"}}
        onChange={(e) =>setFile(e.target.files[0])}
        />
        <label htmlFor="file">Add profile image</label>
       { err && <h3>{err}</h3>}
        <button type="submit">Save</button>
        </form>
        </div>
    )
}