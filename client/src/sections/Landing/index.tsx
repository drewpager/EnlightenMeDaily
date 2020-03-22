import React from 'react';
import { Layout, Typography } from 'antd';
import { EmailSignUpForm } from './form';
import { PageSkeleton } from '../../lib/components';

const { Content } = Layout;
const { Title } = Typography;

export const Landing = () => {
  const LandingPage = EmailSignUpForm ? ( 
    <div className="landing" id="signup-form" dangerouslySetInnerHTML={{ __html: EmailSignUpForm }}/>
  ) : <PageSkeleton />;

  return (
    <Content className="landing-header__title">
      <Title>Enlighten Me Daily®</Title>
      {LandingPage}
    </Content>
  )
}