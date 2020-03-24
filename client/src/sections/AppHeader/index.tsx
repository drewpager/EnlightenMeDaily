import React, { useState } from 'react';
import { Layout, Typography, Input } from 'antd';
import { RouteComponentProps, Link, withRouter } from 'react-router-dom';

import logo from './assets/brain.png'
import { MenuItems } from './components/';
import { Viewer } from '../../lib/types';
import { displayErrorMessage } from '../../lib/utils';

const { Header } = Layout;
const { Text, Paragraph } = Typography;
const { Search } = Input;

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const AppHeader = withRouter(({ viewer, setViewer, history }: Props & RouteComponentProps) => {
  const onSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      history.push(`/topics/${trimmedValue}`);
    } else {
      displayErrorMessage("Please enter a valid search.");
    }
  }
  const [search, setSearch] = useState("");
   return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">
            <img src={logo} alt="Enlighten Me Daily brain logo" />
            {/* <Text style={{ fontSize: "20px", marginLeft: "10px" }} strong>Enlighten Me Daily</Text> */}
          </Link>
        </div>
        <div className="app-header__search-input">
        <Search 
            enterButton
            value={search}
            onChange={e => setSearch(e.target.value)}
            onSearch={onSearch}
            placeholder="Search Enlighten Me Daily Quotes"
            className="app-header__search-input"
          />
        </div>
      </div>
      <div className="app-header__menu-section">
        <MenuItems viewer={viewer} setViewer={setViewer}/>
      </div>
    </Header>
  );
});