import React from 'react';
import PropTypes from 'prop-types';
import styles from './input-text.module.css';

function InputText(props) {
  const { value, onChange, placeholder } = props;
  const { container } = styles;
  return <input type="text" className={container} placeholder={placeholder} onChange={onChange} value={value} />;
}

InputText.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default InputText;
