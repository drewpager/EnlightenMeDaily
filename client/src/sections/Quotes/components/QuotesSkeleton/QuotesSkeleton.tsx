import React from 'react';
import { Skeleton, Divider, Alert } from 'antd';

interface Props {
  title: string;
  error?: boolean;
}

export const QuotesSkeleton = ({ title, error = false }: Props) => {
  const errorAlert = error ? (
    <Alert 
      type="error"
      message="Uh oh! Something went wrong! Please try again."
    />
  ) : null;

  return (
    <div>
      {errorAlert}
      <h2>{title}</h2>
      <Skeleton active paragraph={{ rows: 1 }}/>
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }}/>
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }}/>
      <Divider />
    </div>
  )
}