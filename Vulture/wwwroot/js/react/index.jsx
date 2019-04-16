import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './app.jsx';
import FetchEmployee from './FetchEmployee.jsx';
import AddEmployee from './AddEmployee.jsx';
const app = document.getElementById('main');

const routing =
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">App</Link>
                </li>
                <li>
                    <Link to="/fetchEmployee">FetchEmployee</Link>
                </li>
                <li>
                    <Link to="/addEmployee">AddEmployee</Link>
                </li>
            </ul>

            <hr />

            <Route exact path="/" component={App} />
            <Route path="/fetchEmployee" component={FetchEmployee} />
            <Route path="/addEmployee" component={AddEmployee} />
        </div>
    </Router>;
ReactDOM.render(routing, app);