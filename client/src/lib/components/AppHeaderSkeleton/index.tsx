import React from 'react';
import { Layout } from 'antd';

import logo from './assets/brain.png';
const { Header } = Layout;

export const AppHeaderSkeleton = () => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <img src={logo} alt="Enlighten Me Daily brain logo" />
        </div>
      </div>
    </Header>
  )
}