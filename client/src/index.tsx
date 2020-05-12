import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
import './styles/index.css';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, useMutation } from '@apollo/react-hooks';
import { Home, wrappedQuote as Create, Quote, Topics, NotFound, User, Login, Landing, Policy, AppHeader, AppFooter } from './sections';
import { LOG_IN } from './lib/graphql/mutations/LogIn';
import { LogIn as LogInData, LogInVariables } from './lib/graphql/mutations/LogIn/__generated__/LogIn';
import * as serviceWorker from './serviceWorker';
import { Layout, Affix, Spin } from 'antd';
import { AppHeaderSkeleton, ErrorBanner } from './lib/components/';
import { Viewer } from './lib/types';
import { ScrollToTop } from './lib/utils/';

ReactGA.initialize('UA-132191303-2');
ReactGA.pageview(window.location.pathname + window.location.search);

const history = createBrowserHistory();

history.listen(location => {
  ReactGA.set({ page: location.pathname }); // update the users current page
  ReactGA.pageview(location.pathname); // record a pageview for the given page
})

const client = new ApolloClient({
  uri: '/api',
  request: async operation => {
    const token = sessionStorage.getItem("token");
    operation.setContext({
      headers: {
        "X-CSRF-TOKEN": token || ""
      }
    }); 
  }
});

const initialViewer = {
  id: null,
  token: null,
  avatar: null,
  didRequest: false
}

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: data => {
      if (data && data.logIn) {
        setViewer(data.logIn);
        
        if (data.logIn.token) {
          sessionStorage.setItem("token", data.logIn.token);
        } else {
          sessionStorage.removeItem("token");
        }
      }
    }
  });

  const logInRef = useRef(logIn);

  useEffect(() => {
    logInRef.current();
  }, []); 

  if (!viewer.didRequest && !error) {
    return (
      <Layout className="app-skeleton">
        <AppHeaderSkeleton />
        <div className="app-skeleton__spin-section">
          <Spin size="large" tip="Launching Enlighten Me Daily" />
        </div>
      </Layout>
    )
  }

  const logInErrorBanner = error ? (
  <ErrorBanner description="Failed to log in! Please try again" />
  ) : null;

  return (
  <Router>
    <ScrollToTop />
      <Layout id="app">
      {logInErrorBanner}
        <Affix offsetTop={0} className="app__affix-header">
          <AppHeader viewer={viewer} setViewer={setViewer}/>
        </Affix>
        <Switch> 
          <Route exact path="/" component={Home} history={history} />
          <Route exact path="/login" render={props => <Login {...props} setViewer={setViewer} />} />
          <Route exact path="/privacy-policy" component={Policy} history={history}/>
          <Route exact path="/subscribe" component={Landing} history={history}/>
          <Route exact path="/create" render={props => <Create {...props} viewer={viewer} />} />
          <Route exact path="/quote/:id" component={Quote} history={history}/>
          <Route exact path="/topics/:category?" component={Topics} history={history}/>
          <Route exact path="/user/:id" component={User} history={history}/>
          <Route component={NotFound} history={history}/>
        </Switch>
        <AppFooter />
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
