import express from "express"
import {db} from "../db.js"

export const getAllLikes = (req, res) => {
    const q ="SELECT * FROM likes WHERE `likepostid`=?"
    db.query(q, req.params.id, (err, data)=>{
        if(err){return console.log(err)}
        res.json(data)
    })

}

export const getLike = (req, res) => {
    const q ="SELECT * FROM likes WHERE `id`=?"
    db.query(q, req.params.id, (err, data)=>{
        if(err){return console.log(err)}
        res.json(data)
    })
    
}
export const addLike = (req, res) => {
    const token = req.cookies.access_token
    if(!token){return console.log("Not logged in!")}
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err){return console.log("Token not valid!")}
        const q = "INSERT INTO likes (`likeuserid`, `likepostid`) VALUES (?)"
        const values =[
            userInfo.id,
            req.params.id            
        ]
        db.query(q, [values], (err, data)=>{
            if(err){return console.log(err)}
            res.json(data)
        })
    })
    
}
export const deleteLike = (req, res) => {

    
}