import { Provider } from "react-redux";
import store from "./store";
import Routes from './routes';
import { AuthProvider } from './blockchain/auth';
import LoadingForm from "./components/LoadingForm"
import { Switch } from "react-router-dom"

import './App.css';

function App() {
  
  return (
    <Provider store={store}>
      <AuthProvider loadingForm={LoadingForm}>      
        <Switch>
          <Routes />
        </Switch>
      </AuthProvider>
    </Provider>
  );
}

export default App;
