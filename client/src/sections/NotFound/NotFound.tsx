import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

export const NotFound = () => {
  return (
    <Result 
      status="404"
      title="404 Not Found!"
      subTitle="Wow, you've got our developer scratching his head on this one."
      extra={<Button type="primary"><Link to="/">Home</Link></Button>}
    />
  )
}