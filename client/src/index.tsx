import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import './index.css';
// import App from './App';
import { Quotes } from './sections/Quotes';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: '/api'
});

ReactDOM.render(
<ApolloProvider client={client}>
  <Quotes title="Quotes Page" />
</ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
