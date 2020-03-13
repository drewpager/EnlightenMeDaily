import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/index.css';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import './styles/index.css';
import { Home, Create, Quote, Quotes, NotFound, User, Login, Landing } from './sections';
import * as serviceWorker from './serviceWorker';
import { Layout } from 'antd';
import { Viewer } from './lib/types';

const client = new ApolloClient({
  uri: '/api'
});

const initialViewer = {
  _id: null,
  token: null,
  avatar: null,
  didRequest: false
}

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);

  return (
  <Router>
    <Layout id="app">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" render={props => <Login {...props} setViewer={setViewer} />} />
        <Route exact path="/landing" component={Landing} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/quote/:id" component={Quote} />
        <Route exact path="/quotes/:category?" component={Quotes} />
        <Route exact path="/user/:id" component={User} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
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
