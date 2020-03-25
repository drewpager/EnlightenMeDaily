import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Typography, Divider, Affix } from 'antd';

const { Footer } = Layout;
const { Text } = Typography;

export const AppFooter = () => {
  return (
    <Footer className="app-footer">
      <Text className="app-footer__text">Quick Links</Text>
      <ul className="app-footer__li">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/subscribe">Subscribe</Link></li>
      </ul>
      <Text className="app-footer__text">Quick Quotes</Text>
      <ul className="app-footer__li">
        <li><Link to="/motivational%20quotes">Motivational Quotes</Link></li>
        <li><Link to="/positive%20quotes">Positive Quotes</Link></li>
        <li><Link to="/leadership%20quotes">Leadership Quotes</Link></li>
        <li><Link to="/love%20quotes">Love Quotes</Link></li>
      </ul>
      <Divider />
      <Text className="app-footer__text-center">Enlighten Me Daily® 2020</Text>
    </Footer>
  )
}