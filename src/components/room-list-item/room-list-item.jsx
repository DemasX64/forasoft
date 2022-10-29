import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './room-list-item.module.css';
import Button from '../ui/button/button';

function RoomListItem(props) {
  const { id, users } = props;
  const { container, info } = styles;
  const navigate = useNavigate();

  const onJoinRoomClickHandler = () => {
    navigate(`/room/${id}`);
  };
  return (
    <li className={container}>
      <div className={info}>
        <p>{`ID: ${id}`}</p>
        <p>{`Members: ${users.length}`}</p>
      </div>
      <Button onClick={onJoinRoomClickHandler}>Join room</Button>
    </li>
  );
}

RoomListItem.propTypes = {
  id: PropTypes.string.isRequired,
  users: PropTypes.string.isRequired,
};

export default RoomListItem;
