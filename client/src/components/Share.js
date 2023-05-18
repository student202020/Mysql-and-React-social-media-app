import React from "react";
import axios from "axios"
import { useGlobalContext } from "../context";
import "./Share.css"

export default function Share(){

    const { currentUser} = useGlobalContext()
    const [desc, setDesc] =React.useState("")
    const [file, setFile] =React.useState(null)

    const upload = async () => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await axios.post("http://localhost:5500/api/upload", formData);
          return res.data;
        } catch (err) {
          console.log(err);
        }
      };
     
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const imgUrl = await upload()
        if(desc === ""){return}
        await axios.post("http://localhost:5500/api/posts", {
            desc: desc,
            postImage: file ? imgUrl.filename : "",
            userid: currentUser.id
        }, {withCredentials:true})
        setDesc("")
        setFile(null)
       
    }
  

    return(
        <div className="frame">
        {currentUser && 
        <div >
           <label htmlFor="desc">New post...</label>
          <input type="text"  
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          />
         
          <input type="file"
          id="file" 
          style={{display:"none"}}
          onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file">
            <span>Add image</span>
          </label>
          <button className="aha" onClick={handleSubmit}>Share</button>
            
            </div>}
        
        </div>
    )
}