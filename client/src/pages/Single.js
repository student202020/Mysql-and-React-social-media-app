import React from "react";
import axios from "axios"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context";
import "./Single.css"

export default function Single(){

    const [post, setPost] = React.useState({})
    const navigate = useNavigate()
    const location = useLocation()
    const id = parseInt(location.pathname.split("/")[2])

    const {currentUser} = useGlobalContext()

    const fetchData = async() => {
        const res = await axios.get(`http://localhost:5500/api/posts/${id}`)
        setPost(res.data[0])
    }
    React.useEffect(() => {fetchData()}, [])

    const handleDelete = async() => {
        try{
            await axios.delete(`http://localhost:5500/api/posts/${id}`, {withCredentials: true})
            navigate("/")
        }
        catch(err){console.log(err)}
        
    }
    
    return(
        <div className="centar">
       <Link to="/"><p>Close</p></Link>
        <h1>{post.desc}</h1>
        <img src={`../uploads/${post.postImage}`} alt="" />
        {currentUser ? (currentUser.id === post.userid) && <button onClick={handleDelete}>Delete post</button> : null}
        </div>
    )
}