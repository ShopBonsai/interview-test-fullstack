import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './toast.css';

// Toast Component referenced in this tutorial ->
// https://medium.com/swlh/react-notifications-without-dependencies-801397777e85
const Toast = (props) => {
  const [closeTimeout, setCloseTimeout] = useState(null);

  useEffect(() => {
    beginCloseTimeout();
  }, []);

  const closeSnackBar = () => {
    clearTimeout(closeTimeout);
    ReactDOM.unmountComponentAtNode(document.getElementById('snackbar-fixed-container'));
  };

  const beginCloseTimeout = () => {
    if (props.timer) {
      const timeout = setTimeout(() => closeSnackBar(), props.timer);
      setCloseTimeout(timeout);
    }
  };

  return (
    <div
      className={`snackbar-container ${props.messageType}-container`}
      onMouseEnter={() => clearTimeout(closeTimeout)}
      onMouseLeave={() => beginCloseTimeout()}
    >
      <div>
        <div className="snackbar-info-container">
          <div>
            <h5 className="rubik-text">{props.title}</h5>
            <h5 className="muted-rubik-text"> {props.message}</h5>
          </div>
        </div>
        <div>
          <img
            src={'https://static.thenounproject.com/png/114046-200.png'}
            onClick={() => closeSnackBar()}
            alt="close icon"
            id="close-snackbar-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default Toast;
