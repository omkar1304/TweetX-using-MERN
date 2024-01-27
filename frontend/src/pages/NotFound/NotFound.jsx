import React from "react";
import "./notfound.css";
import Sad from '../../assets/sad.png'

const NotFound = () => {
    return (
      <div className='notfound-section flex-row-center'>
        <h1>404 Not Found</h1>
        <img src={Sad} alt="notfound"/>
      </div>
    )
  }
  
  export default NotFound