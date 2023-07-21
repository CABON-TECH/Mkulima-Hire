import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

//importing the components
import Home from './components/Home';
import WorkerProfile from './components/workers/WorkerProfile';
import FarmerProfile from './components/farmers/FarmerProfile';

const App = () => {
  const store = configureStore();

  return (
    <Provider store={store}>
      <Router>
        <div>
          //navigation bar

         <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/workers/:id" component={WorkerProfile} />
          <Route exact path="/farmers/:id" component={FarmerProfile} />

          <Route render={() => <h1>404: page not found</h1>} />
         </Switch>
           //footer
         
        </div>
      </Router>
    </Provider>
  );
}

export default App;


