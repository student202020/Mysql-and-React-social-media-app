import express from "express"
import {db} from "../db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = (req, res) => {
    
    
    const q = "SELECT * FROM `users` WHERE `username` = ? OR `email` = ?"
     db.query(q, [req.body.username, req.body.email], (err, data)=> {
        if(err) return console.log(err)
        if(data.length) return console.log("vec ste registrovani")
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO `users` (`email`, `username`, `password`, `name`, `userImage`) VALUES (?)"
        const values = [
            req.body.email,
            req.body.username,
            hash,
            req.body.name,
            req.body.userImage
        ]
        db.query(q, [values], (err, data) => {
            if(err) return console.log(err) 
            res.json("novi korisnik je unesen")
        })

    })
}

export const login = (req, res) => {

    const q = "SELECT * FROM users WHERE `username`=?"
    db.query(q, [req.body.username], (err, data)=>{
        if (err){return console.log(err)} 
        if (data.length === 0) {return console.log("Not registered!")}
         const passwordCorrect = bcrypt.compareSync(req.body.password, data[0].password)
         if(!passwordCorrect){return console.log("Wrong password!")}

         const token = jwt.sign({id: data[0].id}, "jwtkey")
         const {password, ...other} = data[0]

         res.cookie("access_token", token, {httpsOnly:true}).json(other)
    })

    
}
export const logout = (req, res) => {
    res.clearCookie("access_token",{
      sameSite:"none",
      secure:true
    }).status(200).json("User has been logged out.")
  };
