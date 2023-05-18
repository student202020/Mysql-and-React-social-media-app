import express from "express"
import mysql from "mysql"

 export const db = mysql.createConnection ({
    host:"localhost",
    user:"root",
    password:"Lg103267novi266",
    database:"social"
})
export default db