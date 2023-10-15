import React  from "react";
import './index.css';
import Card from "./CardTemplate"

import stafflist from "./Articlespost";

const CardComponent = (staff) =>{

    return(
        <Card 
            Artvalu = {staff.Artvalu}
            bookname = {staff.book}
            name = {staff.name}
            description= {staff.description}
        />
    )

}

const Articles =() => {
    return(
        
        <div class="wrap">
            <h1>Featured Articles</h1>
            <div className="Article">
                {stafflist.map(CardComponent)}
            </div>
            <button class="see">See All Articles</button>
    
        </div>

    )
    
    }
    
    export default Articles;
