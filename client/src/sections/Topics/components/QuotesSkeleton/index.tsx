import React from 'react';
import { Card, List, Skeleton } from 'antd';

import quoteLoadingCardCover from '../../../Home/assets/listing-loading-card-cover.jpg';

export const QuotesSkeleton = () => {
  const emptyData = [{}, {}, {}, {}, {}, {}, {}, {}];
  
  return (
    <div className="quotes__skeleton">
      <Skeleton paragraph={{ rows: 1 }} />
      <List 
        grid={{
          gutter: 8,
          xs: 1,
          sm: 2,
          lg: 4
        }}
        dataSource={emptyData}
        renderItem={() => (
          <List.Item>
            <Card 
              cover={
                <div 
                  style={{backgroundImage: `url(${quoteLoadingCardCover})`}}
                  className="quotes-skeleton__card-cover-img"
                ></div>
              }
              loading
              className="quotes-skeleton__card"  
            />
          </List.Item>
        )}
      />
    </div>
  );
};