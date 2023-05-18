import express from "express"
import {db} from "../db.js"
import jwt from "jsonwebtoken"


export const getAllPosts = (req, res) => {
const q = "SELECT p.id, p.postImage, p.desc, u.name, u.email, u.userImage FROM  posts AS p JOIN users AS u ON (p.userid = u.id)"
db.query(q, (err, data) => {
    if(err){return console.log(err)}
    res.json(data)
})

}

export const getAllUserPosts = (req, res) => {

const token = req.cookies.access_token
if(!token){return console.log("Not loged in!")} 

jwt.verify(token, "jwtkey", (err, userInfo)=>{
    if(err){return console.log("Token is not valid!")}
    const q = "SELECT p.postImage, p.desc, u.name, u.email, u.userImage FROM  posts AS p JOIN users AS u ON (p.userid = u.id) WHERE `userid`=?"
    db.query(q, [userInfo.id], (err, data) => {
        if(err){return console.log(err)}
        res.json(data)
    })
})




}
export const getPost = (req, res) => {
const q = "SELECT * FROM  posts WHERE `id`=?"
const postID = req.params.id
db.query(q, postID, (err, data) => {
    if(err){return console.log(err)}
    res.json(data)
    })
    
}
export const addPost = (req, res) => {
const token = req.cookies.access_token
if(!token){return console.log("Not logged in!")}
jwt.verify(token, "jwtkey", (err, userInfo)=>{
    if(err){return console.log("Token not valid!")}
    const q ="INSERT INTO posts (`postImage`, `desc`, `userid`) VALUES (?)"
    const values = [
        req.body.postImage,
        req.body.desc,
        userInfo.id
    ]
    db.query(q, [values], (err, data)=>{
        if(err){return console.log(err)}
        res.json(data)
    })
})
    
}
export const deletePost = (req, res) => {
    const token = req.cookies.access_token
    if(!token){return console.log("Not logged in!")}
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err){return console.log("Token not valid!")}
        const q ="DELETE FROM posts WHERE `id`=? AND `userid`=?"
        const postID =  req.params.id
        db.query(q, [postID, userInfo.id], (err, data)=>{
            if(err){return console.log(err)}
            res.json(data)
        })
    })
    
}
export const updatePost = (req, res) => {
    const token = req.cookies.access_token
    if(!token){return console.log("Not logged in!")}
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err){return console.log("Token not valid!")}
        const q ="UPDATE posts SET (`postImage`=?, `desc`=?) WHERE `userid`=?"
        const postID =  req.params.id
        db.query(q, [postID, userInfo.id], (err, data)=>{
            if(err){return console.log(err)}
            res.json(data)
        })
    })
    
}