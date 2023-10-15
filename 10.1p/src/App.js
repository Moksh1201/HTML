import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from "react-dom";
import Foot from './lastnav';
import Email from './Email';
import "./index.css";


function App() {
  return (

       
          <div>
            <Email />
            <br />
            <Foot />
          </div>
        
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;



