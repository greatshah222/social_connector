import React from 'react';
import classes from './BackDrop.module.css';
import ReactDOM from 'react-dom';

export const BackDrop = (props) => {
  return ReactDOM.createPortal(
    <div className={classes.backdrop} onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};
