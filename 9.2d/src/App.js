import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Topnav from "./Topnav";
import ContentSwitcher from "./ContentSwitcher";
import Login from "./Login";
import Articles from "./Articletemplate";
import Tutorials from "./Tutorialstemplate";
import Foot from "./lastnav";
import Email from "./Email";
import Pricing from "./Pricing"; 
import "./index.css";
import HomePage from "./HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Topnav />
              <Articles />
              <br />
              <Tutorials />
              <br />
              <br />
              <Email />
              <br />
              <Foot />
            </div>
          }
        />
        <Route path="/content" element={<ContentSwitcher />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pricing" element={<Pricing />} /> 
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App;

// import HomePage from './HomePage';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <div>
//     <BrowserRouter>
//     <div>
//       <Routes>
//         <Route path="/" element={<Bar/>} />
        
       

//       </Routes>
//     </div>
//     </BrowserRouter>
    
//   </div>
  
// );