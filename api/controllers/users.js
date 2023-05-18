import express from "express"
import {db} from "../db.js"

export const getAllUsers = (req, res) => {
    const q = "SELECT * FROM  users"
    db.query(q, (err, data) => {
        if(err){return console.log(err)}
        res.json(data)
    })
    
    }
    