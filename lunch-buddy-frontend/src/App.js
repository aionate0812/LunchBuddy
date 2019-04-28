import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import UserLogin from './containers/UserLogin';
import Menuview from './containers/restaurantmenu';

class App extends Component {
  render() {
    return (
      <>
        <HashRouter>
          <Route path='/' component={NavBar} />
          <Switch>
            <Route path='/' exact component={UserLogin} />
            <Route path='/menuview' exact component={Menuview} />
          </Switch>
        </HashRouter>
      </>
    );
  }
}

export default App;
