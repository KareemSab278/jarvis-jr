import Alert from "@mui/material/Alert";
import { useState } from "react";
export { AlertComponent };

import { useEffect } from "react";

const AlertComponent = ({ type, message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  switch (type) {
    case "success":
      return <Alert severity="success">{message}</Alert>;
    case "info":
      return <Alert severity="info">{message}</Alert>;
    case "warning":
      return <Alert severity="warning">{message}</Alert>;
    case "error":
      return <Alert severity="error">{message}</Alert>;
    default:
      return null;
  }
};