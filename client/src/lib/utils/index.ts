import { useEffect, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import { message, notification } from 'antd';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const displaySuccessNotification = (message: string, description?: string) => {
  return notification["success"]({
    message,
    description,
    placement: "topLeft",
    style: {
      margin: 50
    }
  });
};

export const displayErrorMessage = (error: string) => {
  return message.error(error);
}

export const copyToClipboard = (quote: string) => {
  navigator.clipboard.writeText(quote);
  displaySuccessNotification("Copied to Clipboard!");
}