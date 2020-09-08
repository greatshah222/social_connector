import React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Alert = () => {
  const alerts = useSelector((state) => state.alert);
  console.log(alerts);
  let allAlerts = [];
  if (alerts !== null && alerts.length > 0) {
    allAlerts = alerts.map((el) => el.msg);
  }

  const content =
    allAlerts !== null &&
    allAlerts.length > 0 &&
    allAlerts.map((el) => toast.error(el));

  return (
    <>
      <ToastContainer />
      {content}
    </>
  );
};
