import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Input, Typography } from 'antd';

import leadershipImage from '../../assets/leadership.jpg';
import motivationImage from '../../assets/motivation.jpg';
import loveImage from '../../assets/life-love.jpg';
import positivityImage from '../../assets/positivity.jpg';

const { Title } = Typography;
const { Search } = Input;

interface Props {
  onSearch: (value: string) => void;
}

export const HomeHero = ({ onSearch }: Props) => {
  return (
    <div className="home-hero">
      <div className="home-hero__search">
        <Title className="home-hero__title">Search for Quotes</Title>
        <Search 
          placeholder="Search 'Motivational Quotes'" 
          size="large" 
          enterButton 
          className="home-hero__search-input" 
          onSearch={onSearch}
          />
      </div>
      <Row gutter={12} className="home-hero__cards">
        <Col xs={12} md={6}>
          <Link to="/topics/motivational%20quotes">
            <Card cover={<img src={motivationImage} alt="work harder sign for motivational quote"/>}>Motivational Quotes</Card>
          </Link>
        </Col>
        <Col xs={12} md={6}>
          <Link to="/topics/leadership%20quotes">
            <Card cover={<img src={leadershipImage} alt="orchestra conductor leadership image"/>}>Leadership Quotes</Card>
          </Link>
        </Col>
        <Col xs={0} md={6}>
          <Link to="/topics/love%20quotes">
            <Card cover={<img src={loveImage} alt="man and woman navigating life and love quotes"/>}>Life and Love Quotes</Card>
          </Link>
        </Col>
        <Col xs={0} md={6}>
          <Link to="/topics/positive%20quotes">
            <Card cover={<img src={positivityImage} alt="woman radiates positivity and gratitude"/>}>Positivity Quotes</Card>
          </Link>
        </Col>
      </Row>
    </div>
  )
}