import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Header.css";
import logo from "../../assets/logo.svg"
import { Button } from '@material-ui/core';
import LoginRegisterModal from '../modal/LoginRegisterModal';
import ReactModal from 'react-modal';
import { logoutSuccess } from '../../redux/authReducer';

function Header(props) {
  const [showModal, setShowModal] = useState(false);
   ReactModal.setAppElement('#root');

  const dispatch = useDispatch();


  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const selectedMovie = useSelector((state) => state.movies.selectedMovie);

  const loginHandler = () => {
    setShowModal(true);

  }

  const loginLogoutHandler = () => {
    //alert("Hi")
    if (isLoggedIn) {
      dispatch(logoutSuccess());
    } else {
      loginHandler();
    }

  }
  const closeModalHandler = () => {
    setShowModal(false);
  }

  const bookShowHandler = () => {
    isLoggedIn && selectedMovie ? props.history.push(`/bookshow/${selectedMovie}`) : loginHandler();
  }

  return (
    <div className='header'>
      <div id="loginRegisterModal"> </div>
      <div>
        <img className='headerLogo' src={logo} alt="Book Movies Logo" />
        <Button className='BtnLogin' variant="contained" onClick={() => { loginLogoutHandler() }}>{isLoggedIn ? "Logout" : "Login"}</Button>
        <Button className='BtnLogin'
          style={{ marginRight: "10px" }}
          variant="contained" color="primary"
          onClick={() => { bookShowHandler() }}>Book Show</Button>

      </div>
      {<ReactModal
        isOpen={showModal}
        onRequestClose={closeModalHandler}
        shouldCloseOnOverlayClick={true}
        className="Modal"
        overlayClassName="Overlay"
      >
        <LoginRegisterModal {...props}/>
      </ReactModal>}


    </div>
  )
}

export default Header