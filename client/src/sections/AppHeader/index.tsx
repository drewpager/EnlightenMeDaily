import React, { useState, useEffect } from 'react';
import { Layout, Input, Button, Dropdown, Menu } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { RouteComponentProps, Link, withRouter } from 'react-router-dom';

import logo from './assets/brain.png'
import { MenuItems } from './components/';
import { Viewer } from '../../lib/types';
import { displayErrorMessage } from '../../lib/utils';

const { Header } = Layout;
const { Search } = Input;

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const AppHeader = withRouter(({ viewer, setViewer, history, location }: Props & RouteComponentProps) => {
  const onSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      history.push(`/topics/${trimmedValue}`);
    } else {
      displayErrorMessage("Please enter a valid search.");
    }
  }
  const [search, setSearch] = useState("");

  useEffect(() => {
    const { pathname } = location;
    const pathnameSubStrings = pathname.split('/');
    
    if (!pathname.includes('/topics')) {
      setSearch("")
      return;
    }

    if (pathname.includes('/topics') && pathnameSubStrings.length === 3) {
      setSearch(pathnameSubStrings[2]);
      return;
    }
  }, [location])

  const SearchBar = (
    <Search 
      autoFocus
      onFocus={e => e.preventDefault()}
      onClick={e => e.preventDefault()}
      value={search}
      onChange={e => setSearch(e.target.value)}
      onSearch={onSearch}
      placeholder="Search Quotes"
      // className="app-header__search-input"
      allowClear
    />
  );
   return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">
            <img src={logo} alt="Enlighten Me Daily brain logo" />
            {/* <Text style={{ fontSize: "20px", marginLeft: "10px" }} strong>Enlighten Me Daily</Text> */}
          </Link>
        </div>
        { window.innerWidth > 550 ? (
        <div className="app-header__search-input">
        <Search 
            enterButton
            value={search}
            onChange={e => setSearch(e.target.value)}
            onSearch={onSearch}
            placeholder="Search Enlighten Me Daily Quotes"
            // className="app-header__search-input"
          />
        </div>
        ) : (
          <Dropdown overlay={SearchBar} trigger={['click']}>
            <SearchOutlined />
          </Dropdown> 
        )}
      </div>
      <div className="app-header__menu-section">
        <MenuItems viewer={viewer} setViewer={setViewer}/>
      </div>
    </Header>
  );
});