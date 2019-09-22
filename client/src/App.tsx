import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';

const App: React.FunctionComponent = () => {
  const AppSwitch = () => (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/list" component={List} />
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
