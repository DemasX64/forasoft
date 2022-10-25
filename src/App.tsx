import React from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <Route path='/room/:id'>
        
      </Route>
      <Route path='/'></Route>
      <Route path='/login'></Route>
    </Router>
  );
}

export default App;
