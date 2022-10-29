import React from 'react';
import PropTypes from 'prop-types';
import styles from './message.module.css';

function Message(props) {
  const { container, messageFrom, messageText } = styles;
  const { text, from, date } = props;
  return (
    <div className={container}>
      <div className={styles.message}>
        <p className={messageFrom}>{from}</p>
        <p className={messageText}>{text}</p>
      </div>
      <p>{date}</p>
    </div>
  );
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Message;
