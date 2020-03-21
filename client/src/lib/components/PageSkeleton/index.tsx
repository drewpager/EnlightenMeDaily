import React from 'react';
import { Layout, Skeleton } from 'antd';

const { Content } = Layout;

export const PageSkeleton = () => {
  return (
    <Content>
      <Skeleton active paragraph={true} />
      <Skeleton active paragraph={true} />
      <Skeleton active paragraph={true} />
    </Content>
  );
}