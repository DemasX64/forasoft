import React from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import RoomPage from './pages/room-page/room-page';
import RoomListPage from './pages/room-list-page/room-list-page';
import LoginPage from './pages/login-page/login-page';

function App() {
  return (
    <Router>
      <Route path='/room/:id'>
        <RoomPage />
      </Route>
      <Route path='/'>
        <RoomListPage />
      </Route>
      <Route path='/login'>
        <LoginPage />
      </Route>
    </Router>
  );
}

export default App;
