import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeMainComponent from "./containers/main";
import LoginMainComponent from "./containers/login";
import ManagementComponent from "./containers/management";
import BlogComponent from "./containers/blog";
import FAQComponent from "./containers/faq";
// import "bootstrap/dist/css/bootstrap.min.css";
// comment
function App() {
    return (
        <Router>
            <Route path="/" exact component={HomeMainComponent} />
            {/* <Route path="/management" exact component={ManagementComponent} /> */}
            <Route path="/blog" exact component={BlogComponent} />
            <Route path="/faq" exact component={FAQComponent} />
            <Route path="/post" exact component={LoginMainComponent} />
        </Router>
    );
}

export default App;
