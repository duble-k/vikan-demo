import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const MessageBanner = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000} // Adjust the duration as needed
      onClose={onClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={onClose}
        severity={severity} // 'success' or 'error'
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default MessageBanner;
