import React from 'react';
import { useAuth } from '../blockchain/auth';

import SignRoutes from './SignRoutes';
import OtherRoutes from './OtherRoutes';

const Routes = () => {
  const { isLoged } = useAuth();

   return isLoged ? <SignRoutes /> : <OtherRoutes />;  
  //return <OtherRoutes />; 
};

export default Routes;