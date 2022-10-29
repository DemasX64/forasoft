import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.css';

function Button(props) {
  const { onClick, children } = props;
  const { container } = styles;
  return <button type="button" className={container} onClick={onClick}>{children}</button>;
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
