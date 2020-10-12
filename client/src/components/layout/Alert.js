import React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Alert = () => {
  const alerts = useSelector((state) => state.alert);
  // console.log(alerts);
  let allAlerts = [];
  if (alerts !== null && alerts.length > 0) {
    allAlerts = alerts.map((el) => el);
  }

  const successContent =
    allAlerts !== null &&
    allAlerts.length > 0 &&
    allAlerts
      .filter((el) => el.alertType === 'success')
      .map((el) => toast.success(el.msg));

  const failedContent =
    allAlerts !== null &&
    allAlerts.length > 0 &&
    allAlerts
      .filter((el) => el.alertType === 'error')
      .map((el) => toast.error(el.msg));
  return (
    <>
      <ToastContainer />
      {successContent}
      {failedContent}
    </>
  );
};
