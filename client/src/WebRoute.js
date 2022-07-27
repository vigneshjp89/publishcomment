import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Api from './Webpages/Api.js';
import App from './Webpages/App.js';
const WebRoute = () => {
    return(
        <Router>
            <Routes>
                    <Route exact path="/" component= {App} />
                    <Route path = "/api" component = {Api} />
            </Routes>
        </Router>
    );
};
export default WebRoute;