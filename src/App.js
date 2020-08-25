import React from 'react';
// import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
// import io from 'socket.io-client'



import Chat from './Chat.js';
import Report from './Report.js';
import Report2 from './Report2.js';
import Report3 from './Report3.js';
import Report4 from './Report4.js';
import Kmom03 from './Kmom03.js';


import LoggaIn from './LoggaIn.js';
import CreateUpdate from './components/CreateUpdate.js';

import './App.css';


const App = () => (
  <Router>
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Me</Link>
          </li>
          <li>
            <Link to="/report/week/1">Kmom01</Link>
          </li>
          <li>
            <Link to="/report/week/2">Kmom02</Link>
          </li>
          <li>
            <Link to="/report/week/3">Kmom03</Link>
          </li>
          <li>
            <Link to="/report/week/4">Kmom04</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/crud">+week</Link>
          </li>

        </ul>
      </nav>

      <Route exact path="/" component={Chat} />
      <Route exact path="/report/week/1" component={Report} />
      <Route exact path="/report/week/2" component={Report2} />
      <Route exact path="/report/week/3" component={Report3} />
      <Route exact path="/report/week/4" component={Report4} />
      <Route exact path="/register" component={Kmom03} />
      <Route exact path="/login" component={LoggaIn} />
      <Route exact path="/crud" component={CreateUpdate} />

    </div>
  </Router>
);

export default App;
