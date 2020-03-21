import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { Button, Menu, Avatar } from 'antd';

import { LOG_OUT } from '../../../../lib/graphql/mutations/LogOut';
import { LogOut as LogOutData } from '../../../../lib/graphql/mutations/LogOut/__generated__/LogOut';
import { Viewer } from '../../../../lib/types';
import { displaySuccessNotification, displayErrorMessage } from '../../../../lib/utils/index';

const { Item, SubMenu } = Menu;

interface Props {
  viewer: Viewer
  setViewer: (viewer: Viewer) => void;
}

export const MenuItems = ({ viewer, setViewer }: Props) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: data => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        sessionStorage.removeItem("token");
        displaySuccessNotification("You have successfully logged out.");
      }
    },
    onError: () => {
      displayErrorMessage(
        "Failed to log you out."
      );
    }
  });

  const handleLogOut = () => {
    logOut();
  };

  const subMenuLogin = 
  viewer.id && viewer.avatar ? (
    <SubMenu title={<Avatar src={viewer.avatar} />}>
      <Item key={`/user/${viewer.id}`}>
        <Link to={`/user/${viewer.id}`}>
          Profile
        </Link>
      </Item>
      <Item key="logout">
        <div onClick={handleLogOut}>
          Logout
        </div>
      </Item>
    </SubMenu>
  ) : (
    <Item>
      <Link to="/login">
        <Button type="primary">Sign Up</Button>
      </Link>
    </Item>
  );

  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Item key="/create">
        <Link to="/create">
          Create Quote
        </Link>
      </Item>
      {subMenuLogin}
    </Menu>
  )
}