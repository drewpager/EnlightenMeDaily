import { message, notification } from 'antd';

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