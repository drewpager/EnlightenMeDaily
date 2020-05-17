import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Input, Typography } from 'antd';

const leadershipImage = "https://res.cloudinary.com/drewpager/image/upload/v1589379464/enlighten-me-daily/leadership_ler0gg.jpg";
const motivationImage = "https://res.cloudinary.com/drewpager/image/upload/v1589379464/enlighten-me-daily/motivation_fdh0ih.jpg";
const loveImage = "https://res.cloudinary.com/drewpager/image/upload/v1589379464/enlighten-me-daily/life-love_linox3.jpg";
const positivityImage = "https://res.cloudinary.com/drewpager/image/upload/v1589379464/enlighten-me-daily/positivity_jakbep.jpg";

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
            <Card cover={<img src={leadershipImage} alt="orchestra conductor leadership"/>}>Leadership Quotes</Card>
          </Link>
        </Col>
        <Col xs={0} md={6}>
          <Link to="/topics/life%20quotes">
            <Card cover={<img src={loveImage} alt="man and woman navigating life and love quotes"/>}>Life Quotes</Card>
          </Link>
        </Col>
        <Col xs={0} md={6}>
          <Link to="/topics/positive%20quotes">
            <Card cover={<img src={positivityImage} alt="woman radiates positivity and gratitude"/>}>Positive Quotes</Card>
          </Link>
        </Col>
      </Row>
    </div>
  )
}