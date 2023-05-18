import React from "react";
import { useGlobalContext } from "../context";
import "./user.css"


export default function User(){

    const {currentUser} = useGlobalContext()
    return(
        <div >
       

{currentUser && <div className="frame">
    <img src={`../uploads/${currentUser.userImage}`} alt="nema slike"/>
    <h3>{currentUser.name}</h3>
    <h3 className="push">{currentUser.email}</h3>
    </div>
    }


       
       
        </div>
    )
}