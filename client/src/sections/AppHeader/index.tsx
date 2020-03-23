import React from 'react';
import { Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';

import logo from './assets/brain.png'
import { MenuItems } from './components/';
import { Viewer } from '../../lib/types';

const { Header } = Layout;
const { Text, Paragraph } = Typography;

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const AppHeader = ({ viewer, setViewer }: Props) => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">
            <img src={logo} alt="Enlighten Me Daily brain logo" />
            <Text style={{ fontSize: "20px", marginLeft: "10px" }} strong>Enlighten Me Daily</Text>
          </Link>
        </div>
      </div>
      <div className="app-header__menu-section">
        <MenuItems viewer={viewer} setViewer={setViewer}/>
      </div>
    </Header>
  );
};