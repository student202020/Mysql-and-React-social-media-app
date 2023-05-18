import axios from "axios";
import React from "react";
import {Link} from "react-router-dom"
import { useGlobalContext } from "../context";
import "./Post.css"


export default function Post({id, postImage, desc}){

const {currentUser} = useGlobalContext()
 
const [show, setShow] = React.useState(false)
const [comment, setComment] = React.useState("")
const [commentss, setCommentss] = React.useState([])


const fetchData = async() => {
    const res = await axios.get("http://localhost:5500/api/comments?compostid=" + id)

    setCommentss(res.data)
}
React.useEffect(() => {fetchData()}, [commentss])

const addComent = async() => {
    if(comment === ""){return}
    await axios.post("http://localhost:5500/api/comments", 
    {
    compostid: id,
    comuserid: currentUser.id,
    comment: comment,
    }
    , {withCredentials:true})
    setComment("")
}

const handleDeleteComment = async(nesto) => {
    try{
        await axios.delete(`http://localhost:5500/api/comments/${nesto}`, {withCredentials: true})
    }
    catch(err){console.log(err)}
    
}
    return(
       
        <>
       
            <div className="centar">
           
            <h3>{desc}</h3>

            <Link   to={`/post/${id}`}><img src={`../uploads/${postImage}`} alt="" /></Link>
            <div>
            {currentUser && <div><input type="text"
            name="comment"
            placeholder="...add comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            />
            <button onClick = {addComent}>Add</button>
            </div>
            }
            <p onClick={() => setShow(!show)}>{`${commentss.length} comments`}</p>
            {show && <div>
                
                {commentss.map(item => {
                    return(<div className="to">
                        <div>{item.comment}</div>
                        {currentUser ? (currentUser.id === item.comuserid) && <button onClick={() => handleDeleteComment(item.id)}>x</button> : null}
                        
                        </div>)
                })}
                
                
                </div>}
                </div>
            </div>
       
        </>
    )
}