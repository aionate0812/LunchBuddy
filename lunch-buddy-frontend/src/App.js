import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import UserLogin from './containers/UserLogin';
import Menuview from './containers/Restaurantmenu/copy';
import SearchResults from './containers/RestSearchResults/RestSearchResults';
import Order from './containers/Order/Order'
import Dashboard from './containers/Dashboard/Dashboard'
import Error404 from './containers/Error404/Error404'
import InviteUser from './containers/inviteUsers/InviteUser'
import './index.css'

class App extends Component {
  render() {
    return (
      <>
        <HashRouter>
          <Route path='/' component={NavBar} />
          <Switch>
          <Route path='/' exact component={UserLogin} />
            <Route path='/menuview/:res_id' exact component={Menuview} />
            <Route path='/search/results' exact component={SearchResults} />
            <Route path='/search' exact component={SearchResults} />
            <Route path='/order/:id' exact />
            <Route path='/order/:id/invite' exact component={InviteUser}/>
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
