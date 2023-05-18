import axios from "axios";
import React from "react";
import Post from "./Post"
import "./Posts.css"

export default function Posts(){
    const [posts, setPosts] = React.useState([])
    const [users, setUsers] = React.useState([])

    const fetchData = async() => {
        const res = await axios.get("http://localhost:5500/api/posts", {withCredentials: true})
        setPosts(res.data)
    }
    
    React.useEffect(()=>{
        fetchData()
    }, [posts])

    const fetchUsers = async() => {
        const res = await axios.get("http://localhost:5500/api/users/all", {withCredentials: true})
        setUsers(res.data)
    }
    
    React.useEffect(()=>{
        fetchUsers()
    }, [])
    return(
        
       <div className="row">
        <div className="column">
        <div className="split1">{posts.reverse().map(item => {return(
            <div className="centar">
            <Post {...item} />
            </div>
        )})}
        </div>
        <div className="split2">{users.map(item => {
            return(<div>

                <h4>{item.name}</h4>
                <img src={`../uploads/${item.userImage}`} alt=""/>
            </div>)
        })}</div>
        </div>
        </div>
    )
}