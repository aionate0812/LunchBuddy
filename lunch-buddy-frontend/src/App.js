import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import UserLogin from './containers/UserLogin';

class App extends Component {
  render() {
    return (
      <>
        <HashRouter>
          <Route path='/' component={NavBar} />
          <Switch>
            <Route path='/' exact component={UserLogin} />
          </Switch>
        </HashRouter>
      </>
    );
  }
}

export default App;
