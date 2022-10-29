import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4, validate } from 'uuid';
import { useNavigate } from 'react-router';
import RoomListItem from '../../components/room-list-item/room-list-item';
import Button from '../../components/ui/button/button';
import styles from './room-list-page.module.css';
import SocketContext from '../../context/SocketContext';
import ACTIONS from '../../utils/actions';

function RoomListPage() {
  const { wrapper, container } = styles;
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [roomList, setRoomList] = useState([]);

  const createRoom = () => {
    const roomID = uuidv4();
    socket.emit(ACTIONS.CREATE_ROOM, roomID);
    navigate(`/room/${roomID}`);
  };

  const onCreateRoomHandler = () => {
    createRoom();
  };

  useEffect(() => {
    socket.emit(ACTIONS.GET_ROOMS);
    socket.on(ACTIONS.GET_ROOMS, (rooms) => {
      const validatedRooms = rooms.filter((room) => validate(room.id));
      setRoomList(validatedRooms);
    });
    return () => {
      socket.off(ACTIONS.GET_ROOMS);
    };
  }, [socket]);

  return (
    <div className={wrapper}>
      <div className={container}>
        <ul className={styles.roomList}>
          {roomList.map((room) => {
            const { id, users } = room;
            return <RoomListItem key={id} id={id} users={users} />;
          })}
        </ul>
        <Button onClick={onCreateRoomHandler}>Create new room</Button>
      </div>
    </div>
  );
}

export default RoomListPage;
