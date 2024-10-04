import React from 'react'
import { Slide, toast } from 'react-toastify';

const ToastAlerts = (message) => {
    toast.warn(message,{
      position: 'top-right',
      style: {
        top: '130px',
      },
      autoClose: 5000,
      transition: Slide,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

export default ToastAlerts