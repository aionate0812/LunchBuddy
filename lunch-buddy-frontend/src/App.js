import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import UserLogin from './containers/UserLogin';
import Menuview from './containers/Restaurantmenu/restaurantmenu';
import SearchResults from './containers/RestSearchResults/RestSearchResults';
import Order from './containers/Order/Order'
import Dashboard from './containers/Dashboard/Dashboard'
import Error404 from './containers/Error404/Error404'

class App extends Component {
  render() {
    return (
      <>
        <HashRouter>
          <Route path='/' component={NavBar} />
          <Switch>
          <Route path='/' exact component={UserLogin} />
            <Route path='/menuview' exact component={Menuview} />
            <Route path='/search/results' exact component={SearchResults} />
            <Route path='/search' exact />
            <Route path='/order/:id' exact />
            <Route path='/order' exact component={Order} />
            <Route path='/dashboard' exact component={Dashboard} />
            <Route component={Error404} />
          </Switch>
        </HashRouter>
      </>
    );
  }
}

export default App;
