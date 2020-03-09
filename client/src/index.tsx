import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/index.css';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import './styles/index.css';
import { Home, Create, Quote, Quotes, NotFound, User } from './sections';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: '/api'
});

const App = () => {
  return (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/create" component={Create} />
      <Route exact path="/quote/:id" component={Quote} />
      <Route exact path="/quotes/:category?" component={Quotes} />
      <Route exact path="/user/:id" component={User} />
      <Route component={NotFound} />
    </Switch>
  </Router>
  );
}

ReactDOM.render(
<ApolloProvider client={client}>
  <App />
</ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
