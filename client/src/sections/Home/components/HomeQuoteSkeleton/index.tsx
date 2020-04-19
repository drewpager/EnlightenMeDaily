import React from 'react';
import { Card, List, Skeleton } from 'antd';

import quoteLoadingCardCover from '../../assets/listing-loading-card-cover.jpg';

export const HomeQuoteSkeleton = () => {
  const emptyData = [{}, {}, {}, {}, {}, {}, {}, {}];
  
  return (
    <div className="home-quotes__skeleton">
      <Skeleton paragraph={{ rows: 0 }} />
      <List 
        grid={{
          gutter: 8,
          xs: 1,
          sm: 2,
          lg: 2
        }}
        dataSource={emptyData}
        renderItem={() => (
          <List.Item>
            <Card 
              cover={
                <div 
                  style={{backgroundImage: `url(${quoteLoadingCardCover})`}}
                  className="home-quotes-skeleton__card-cover-img"
                ></div>
              }
              loading  
            />
          </List.Item>
        )}
      />
    </div>
  );
};