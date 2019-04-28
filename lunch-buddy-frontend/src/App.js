import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import UserLogin from './containers/UserLogin';
import Menuview from './containers/restaurantmenu';
import SearchResults from './containers/RestSearchResults/RestSearchResults';
import Order from './containers/Order/Order'
import Dashboard from './containers/Dashboard/Dashboard'


class App extends Component {
  render() {
    return (
      <>
        <HashRouter>
          <Route path='/' component={NavBar} />
          <Switch>
            <Route path='/' exact component={UserLogin} />
            <Route path='/menuview' exact component={Menuview} />
            <Route path='/order/:id/search/results' exact component={SearchResults} />
            <Route path='/order/:id' exact component={Order} />
            <Route path='/dashboard' exact component={Dashboard} />

          </Switch>
        </HashRouter>
      </>
    );
  }
}

export default App;
