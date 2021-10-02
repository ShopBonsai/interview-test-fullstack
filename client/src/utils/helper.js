import ReactDOM from 'react-dom';
import React from 'react';
import Toast from '../components/toast/toast.component';

const triggerSnackbar = (title, message, messageType) => {
  const validMessageTypes = ['error', 'info', 'warning', 'success'];
  if (!validMessageTypes.includes(messageType)) {
    throw Error('Invalid snackbar message type');
  }
  ReactDOM.render(
    <Toast messageType={messageType} timer={2000} title={title} message={message} />,
    document.getElementById('snackbar-fixed-container'),
  );
};

export const showErrorMessage = (title, message) => {
  triggerSnackbar(title, message, 'error');
};

export const showInfoMessage = (title, message) => {
  triggerSnackbar(title, message, 'info');
};

export const showSuccessMessage = (title, message) => {
  triggerSnackbar(title, message, 'success');
};

export const showWarningMessage = (title, message) => {
  triggerSnackbar(title, message, 'warning');
};
