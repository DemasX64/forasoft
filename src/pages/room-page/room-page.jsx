import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './room-page.module.css';
import useWebRTC from '../../hooks/useWebRTC';
import Message from '../../components/message/message';
import InputText from '../../components/ui/input-text/input-text';
import Button from '../../components/ui/button/button';
import SocketContext from '../../context/SocketContext';
import getTime from '../../utils/getTime';
import ACTIONS from '../../utils/actions';

function RoomPage() {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const { roomID } = useParams();
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const {
    container,
    column, membersList, chat, membersTitle, video,
    chatMessages, input, buttons,
  } = styles;

  const { clients, provideMediaRef } = useWebRTC(roomID, socket, isWebcamEnabled);

  const onChangeMessageInputHandler = (e) => {
    setMessageInput(e.target.value);
  };

  const sendMessage = () => {
    if (messageInput) {
      socket.emit(
        ACTIONS.SEND_MESSAGE,
        {
          text: messageInput,
          roomID,
          from: socket.nickname,
          date: getTime(),
        },
      );
      setMessageInput('');
    }
  };

  const onWebcamToggleHandler = () => {
    setIsWebcamEnabled(!isWebcamEnabled);
  };

  const leaveRoom = () => {
    navigate('/');
  };

  useEffect(() => {
    socket.emit(ACTIONS.JOIN_ROOM, roomID);
    return () => {
      socket.emit(ACTIONS.LEAVE_ROOM, roomID);
    };
  }, [socket, roomID]);

  useEffect(() => {
    socket.emit(ACTIONS.GET_MEMBERS, roomID);
    socket.on(ACTIONS.GET_MEMBERS, setMembers);
    return () => {
      socket.off(ACTIONS.GET_MEMBERS);
    };
  }, [socket, roomID]);

  useEffect(() => {
    socket.on(ACTIONS.SEND_MESSAGE, (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      socket.off(ACTIONS.SEND_MESSAGE);
    };
  }, [socket, roomID]);

  return (
    <div className={container}>
      <div className={column}>
        <div className={buttons}>
          <Button onClick={leaveRoom}>Leave room</Button>
          <Button onClick={onWebcamToggleHandler}>{`${isWebcamEnabled ? 'Disable' : 'Enable'} video`}</Button>
        </div>
        <div className={membersList}>
          <p className={membersTitle}>Members</p>
          {members.map((member) => <p>{member}</p>)}
        </div>
      </div>
      <div className={chat}>
        <div className={chatMessages}>
          {messages.map((message) => {
            const { text, from, date } = message;
            return <Message text={text} from={from} date={date} />;
          })}
        </div>
        <div className={input}>
          <InputText placeholder="Message" onChange={onChangeMessageInputHandler} value={messageInput} />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>
      <div className={column}>
        {clients.map((clientID) => (
          <video
            className={video}
            key={clientID}
            ref={(instance) => {
              provideMediaRef(clientID, instance);
            }}
            autoPlay
            muted
            playsInline
          />
        ))}
      </div>
    </div>
  );
}

export default RoomPage;
