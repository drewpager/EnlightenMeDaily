import React from 'react';
import { Card, List, Skeleton } from 'antd';

const quoteLoadingCardCover = "https://res.cloudinary.com/drewpager/image/upload/v1589379464/enlighten-me-daily/listing-loading-card-cover_znf3uw.png";

export const HomeQuoteSkeleton = () => {
  const emptyData = [{}, {}, {}, {}, {}, {}, {}, {}];
  
  return (
    <div className="home-quotes__skeleton">
      <Skeleton paragraph={{ rows: 0 }} />
      <List 
        grid={{
          gutter: 8,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 2
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