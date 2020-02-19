import React from "react";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import "./App.css";
import { createBrowserHistory } from "history";
import * as Screens from "./Screens";
import LayoutContextProvider from "./Screens/Layout/LayoutContext";

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <LayoutContextProvider>
      <Router history={history}>
        <Switch>
          <Route path="/login" exact={true} component={Screens.LoginScreen} />
          <Route path="/" exact={true} component={Screens.HomeScreen} />
          {/* <Route exact path='/' render={() => <Redirect to='/list-user' />} /> */}

          {/* <Route path="/" exact={true} component={Screens.MainScreen} render={() => <Redirect to='/list-user' />} /> */}
          <Route
            path="/list-user"
            exact={true}
            component={Screens.ListUserScreen}
          />
          <Route
            path="/list-user/:userid"
            exact={true}
            component={Screens.DetailsUserScreen}
          />
        </Switch>
      </Router>
    </LayoutContextProvider>
  );
};

export default App;
