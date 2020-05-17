import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Result, Button } from 'antd';

const { Content } = Layout;

export const User = () => {
  return (
    <Content> 
      <Result
        title="User Page Under Construction, We will notify you when this is ready."
        extra={
          <Link to="/"><Button type="primary">Check Out Some Quotes</Button></Link>
        }
      />
    </Content>
  );
}