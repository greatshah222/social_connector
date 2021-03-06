import React from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
import { BackDrop } from '../Backdrop/BackDrop';
import { CSSTransition } from 'react-transition-group';

const ModalOverlay = (props) => {
  const content = (
    <div className={`${classes.modal} ${props.className}`} style={props.style}>
      <header className={`${classes.modalHeader} ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        className={`${props.formClass}`}
        onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()}
      >
        <div className={`${classes.modalContent} ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`${classes.modalFooter} ${props.footerClass}`}>
          {props.footer}{' '}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};
export const Modal = (props) => {
  return (
    <>
      {props.show && <BackDrop onClick={props.onCancel} />}
      {/* // the modal will only show when the props.show is true */}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={classes.modal}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};
