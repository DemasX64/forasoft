import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Button from '../../components/ui/button/button';
import InputText from '../../components/ui/input-text/input-text';
import SocketContext from '../../context/SocketContext';
import ACTIONS from '../../utils/actions';
import styles from './login-page.module.css';

function LoginPage() {
  const { container, form, title } = styles;
  const navigate = useNavigate();
  const location = useLocation();
  const [nicknameValue, setNicknameValue] = useState('');
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit(ACTIONS.GET_NICKNAME);
    socket.on(ACTIONS.GET_NICKNAME, (nickname) => {
      if (nickname) {
        socket.nickname = nickname;
        if (location.state) {
          navigate(location.state);
        } else {
          navigate('/', { replace: true });
        }
      }
    });
    return () => {
      socket.off(ACTIONS.GET_NICKNAME);
    };
  }, [socket, navigate]);

  const onChangeHandler = (e) => {
    setNicknameValue(e.target.value);
  };

  const setNickname = () => {
    socket.emit(ACTIONS.SET_NICKNAME, { nickname: nicknameValue });
  };

  return (
    <div className={container}>
      <div className={form}>
        <p className={title}>Enter nickname</p>
        <InputText placeholder="Nickname" onChange={onChangeHandler} value={nicknameValue} />
        <Button onClick={setNickname}>Enter</Button>
      </div>
    </div>
  );
}

export default LoginPage;
