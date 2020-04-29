import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Layout, Typography } from 'antd';
import { HomeHero, HomeQuotes, HomeQuoteSkeleton, HomeDailyQuote } from './components/';
import { displayErrorMessage } from '../../lib/utils';
import { QUOTES } from '../../lib/graphql/queries/Quotes';
import { Quotes as QuotesData, QuotesVariables } from '../../lib/graphql/queries/Quotes/__generated__/Quotes';
import { QuoteFilter } from '../../lib/graphql/globalTypes';

import mapBackground from './assets/map-background.jpg';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const PAGE_LIMIT = 8;
const PAGE_NUMBER = 1;

export const Home = ({ history }: RouteComponentProps) => {
  const { loading, data } = useQuery<QuotesData, QuotesVariables>(QUOTES, {
    variables: {
      category: "motivation, leadership, love",
      filter: QuoteFilter.MOST_RECENT,
      limit: PAGE_LIMIT,
      page: PAGE_NUMBER
    }
  });
  const onSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue && trimmedValue.length > 0) {
      history.push(`/topics/${trimmedValue}`);
    } else {
      displayErrorMessage("Please enter a valid search.");
    }
  }

  const renderQuotesSection = () => {
    if (loading) {
      return <HomeQuoteSkeleton />;
    }

    if (data) {
      return <HomeQuotes title="New Quotes" quotes={data.quotes.result} />;
    }

    return null;
  }

  const renderDailyQuote = () => {
    if (data && data.quotes) {
      return <HomeDailyQuote />;
    }
  }

  return (
    <Content className="home" style={{ backgroundImage: `url(${mapBackground})`}}>
      <HomeHero onSearch={onSearch}/>
      <div className="home__cta-section">
        <Title level={2} className="home__cta-section-title">
          Receive Daily Quotes and More in Your Inbox 
        </Title>
        <Paragraph>Subscribe now for a daily dashboard of what motivates you.</Paragraph>
        <Link to="/subscribe" className="ant-btn ant-btn-primary ant-btn-lg home__cta-section-button">
          Subscribe
        </Link>
        {renderDailyQuote()}
        {renderQuotesSection()}
      </div>
    </Content>
  )
}