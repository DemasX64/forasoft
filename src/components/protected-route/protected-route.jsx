import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import SocketContext from '../../context/SocketContext';

function ProtectedRoute() {
  const socket = useContext(SocketContext);
  const location = useLocation();

  return socket.nickname ? <Outlet /> : <Navigate to="/login" state={location} />;
}

export default ProtectedRoute;
