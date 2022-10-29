/* eslint-disable no-param-reassign */
const socketio = require('socket.io');
const express = require('express');
const cors = require('cors');
const ACTIONS = require('./constants/socketActions');
const RoomService = require('./services/roomService');
require('dotenv').config();

const port = process.env.PORT || 4000;
const app = express();

app.use(cors());

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});

const nicknames = {};

const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const onConnection = (socket) => {
  socket.on(ACTIONS.SET_NICKNAME, (obj) => {
    socket.nickname = obj.nickname;
    nicknames[socket.id] = obj.nickname;
    socket.emit(ACTIONS.GET_NICKNAME, socket?.nickname);
  });

  socket.on(ACTIONS.GET_NICKNAME, () => {
    socket.emit(ACTIONS.GET_NICKNAME, socket?.nickname);
  });

  socket.on(ACTIONS.GET_ROOMS, () => {
    socket.emit(ACTIONS.GET_ROOMS, RoomService.getRooms(io));
  });

  socket.on(ACTIONS.GET_MEMBERS, (roomID) => {
    socket.emit(ACTIONS.GET_MEMBERS, RoomService.getMembers(io, roomID, nicknames));
  });

  socket.on(ACTIONS.CREATE_ROOM, (roomID) => {
    socket.join(roomID);
    io.emit(ACTIONS.GET_ROOMS, RoomService.getRooms(io));
  });

  socket.on(ACTIONS.JOIN_ROOM, (roomID) => {
    socket.join(roomID);
    io.emit(ACTIONS.GET_ROOMS, RoomService.getRooms(io));
    socket.to(roomID).emit(ACTIONS.GET_MEMBERS, RoomService.getMembers(io, roomID, nicknames));

    const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);
    clients.forEach((clientID) => {
      io.to(clientID).emit(ACTIONS.ADD_PEER, {
        peerID: socket.id,
        createOffer: false,
      });
      socket.emit(ACTIONS.ADD_PEER, {
        peerID: clientID,
        createOffer: true,
      });
    });
  });

  socket.on(ACTIONS.SEND_MESSAGE, (message) => {
    io.to(message.roomID).emit(ACTIONS.SEND_MESSAGE, message);
  });

  socket.on(ACTIONS.RELAY_SDP, ({ peerID, sessionDescription }) => {
    io.to(peerID).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerID: socket.id,
      sessionDescription,
    });
  });

  socket.on(ACTIONS.RELAY_ICE, ({ peerID, iceCandidate }) => {
    io.to(peerID).emit(ACTIONS.ICE_CANDIDATE, {
      peerID: socket.id,
      iceCandidate,
    });
  });

  socket.on(ACTIONS.LEAVE_ROOM, (roomID) => {
    socket.leave(roomID);
    io.to(roomID).emit(ACTIONS.GET_MEMBERS, RoomService.getMembers(io, roomID, nicknames));
    io.emit(ACTIONS.GET_ROOMS, RoomService.getRooms(io));
  });

  socket.on('disconnect', () => {
    delete nicknames[socket.id];
    const rooms = RoomService.getRooms(io);
    rooms.forEach((room) => {
      io.to(room.id).emit(ACTIONS.GET_MEMBERS, RoomService.getMembers(io, room.id, nicknames));
    });
  });
};

io.on('connect', onConnection);
