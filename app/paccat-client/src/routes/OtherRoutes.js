import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Rules from '../components/Rules';
import Welcome from '../components/Welcome';

const OtherRoutes = () => {
  return (
    <Switch>      
      <Route path="/rules" component={Rules} /> 
      <Route path="/" component={Welcome} />
    </Switch>
  );
};

export default OtherRoutes;