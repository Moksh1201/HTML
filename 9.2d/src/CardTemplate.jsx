import React from "react";
import './index.css';
import star from './Image/star.webp'


const Card = (props) =>{
    return(
        <div  class="article">
            <img src={props.Artvalu} alt="Artvalu" width="220px" height="250px"/>
            <h3>{props.bookname}</h3>
            <p>{props.description}</p>
            <div id="star">
                <img src={star} alt="star" width="15" height="15"/>
                <a href = " # ">{props.name} </a>
            </div>

          

           
        </div>
    )
}

export default Card;