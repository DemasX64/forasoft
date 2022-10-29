import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';
import io from 'socket.io-client';
import RoomPage from './pages/room-page/room-page';
import RoomListPage from './pages/room-list-page/room-list-page';
import LoginPage from './pages/login-page/login-page';
import ProtectedRoute from './components/protected-route/protected-route';
import SocketContext from './context/SocketContext';
import connectionString from './utils/connectionString';

const socket = io.connect(connectionString);

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Routes>
          <Route path="/room/:roomID" element={<ProtectedRoute />}>
            <Route path="/room/:roomID" element={<RoomPage />} />
          </Route>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<RoomListPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
