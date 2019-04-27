import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import UserLogin from './containers/UserLogin';
import SearchResults from './containers/RestSearchResults/RestSearchResults';

class App extends Component {
  render() {
    return (
      <>
        <HashRouter>
          <Route path='/' component={NavBar} />
          <Switch>
            <Route path='/' exact component={UserLogin} />
            <Route path='/order/:orderid/search/results' exact component={SearchResults} />
          </Switch>
        </HashRouter>
      </>
    );
  }
}

export default App;
