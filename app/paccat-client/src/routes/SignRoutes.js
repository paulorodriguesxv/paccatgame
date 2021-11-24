import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PlayGame from '../components/PlayGame';
import Rules from '../components/Rules';

const SignRoutes = () => {
  return (
      <Switch>
        <Route path="/rules" component={Rules} />      
        <Route path="/" component={PlayGame} />        
      </Switch>
  );
};

export default SignRoutes;