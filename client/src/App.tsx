import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './pages/home';
import { Companies } from './pages/companies';
import { Code } from './pages/code';
import { Resources } from './pages/resources';

const App: React.FunctionComponent = () => {
  const AppSwitch = () => (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/companies" component={Companies} />
        <Route path="/code" component={Code} />
        <Route path="/resources" component={Resources} />
      </Switch>
    </div>
  );
  return (
    <Switch>
      <AppSwitch />
    </Switch>
  );
};

export default App;
