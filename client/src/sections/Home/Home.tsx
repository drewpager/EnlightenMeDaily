import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Layout, Typography } from 'antd';
import { HomeHero } from './components/';
import { displayErrorMessage } from '../../lib/utils';

import mapBackground from './assets/map-background.jpg';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const Home = ({ history }: RouteComponentProps) => {
  const onSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue && trimmedValue.length > 0) {
      history.push(`/topics/${trimmedValue}`);
    } else {
      displayErrorMessage("Please enter a valid search.");
    }
  }
  return (
    <Content className="home" style={{ backgroundImage: `url(${mapBackground})`}}>
      <HomeHero onSearch={onSearch}/>
      <div className="home__cta-section">
        <Title level={2} className="home__cta-section-title">
          Receive a Newsletter Built Just for You
        </Title>
        <Paragraph>Subscribe now for a daily dashboard of what motivates you.</Paragraph>
        <Link to="/subscribe" className="ant-btn ant-btn-primary ant-btn-lg home__cta-section-button">
          Subscribe
        </Link>
      </div>
    </Content>
  )
}