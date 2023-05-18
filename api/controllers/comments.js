import express from "express"
import {db} from "../db.js"
import jwt from "jsonwebtoken"

export const getAllComments = (req, res) => {
const q ="SELECT * FROM comments WHERE `compostid`=?"
db.query(q, [req.query.compostid], (err, data)=>{
    if(err){return console.log(err)}
    res.json(data)
})

}
export const getComment = (req, res) => {
    const q ="SELECT * FROM comments WHERE `id`= ?"
    db.query(q, [req.params.id], (err, data)=>{
        if(err){return console.log(err)}
        res.json(data)
    })
    
    }

export const addComment = (req, res) => {
    const token = req.cookies.access_token
    if(!token){return console.log("Not logged in!")}
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err){return console.log("Token not valid!")}
        const q = "INSERT INTO comments (`compostid`, `comuserid`, `comment` ) VALUES (?)"
       const values=[
        req.body.compostid,
        req.body.comuserid,
        req.body.comment,
        
       ]
        db.query(q, [values], (err, data)=>{
            if(err){return console.log(err)}
            res.json(data)
        })
    })
    
    
}
export const deleteComment = (req, res) => {
    const token = req.cookies.access_token
    if(!token){return console.log("Not logged in!")}
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err){return console.log("Token not valid!")}
        const q = "DELETE FROM comments WHERE `id`=? AND `comuserid` = ?"
       
        db.query(q, [req.params.id, userInfo.id], (err, data)=>{
            if(err){return console.log(err)}
            res.json(data)
        })
    })
    
}
