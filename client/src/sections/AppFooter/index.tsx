import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Typography, Divider } from 'antd';

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
        <li><Link to="topics/motivational-quotes">Motivational Quotes</Link></li>
        <li><Link to="topics/positive-quotes">Positive Quotes</Link></li>
        <li><Link to="topics/leadership-quotes">Leadership Quotes</Link></li>
        <li><Link to="topics/love-quotes">Love Quotes</Link></li>
      </ul>
      <Divider />
      <Text className="app-footer__text-center">Enlighten Me Daily® 2020</Text>
    </Footer>
  )
}