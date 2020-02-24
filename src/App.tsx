import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import "./App.css";
import { createBrowserHistory } from "history";
import * as Screens from "./Screens";
import LayoutContextProvider from "./Screens/Layout/LayoutContext";
import * as Components from "./Components";

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Router history={history}>
      <LayoutContextProvider>
        <Components.ToastProvider>
          <Switch>
            <Route path="/login" exact={true} component={Screens.LoginScreen} />
            <Route path="/" exact={true} component={Screens.HomeScreen} />
            <Route
              path="/list-user"
              exact={true}
              component={Screens.ListUserScreen}
            />
          </Switch>
        </Components.ToastProvider>
      </LayoutContextProvider>
    </Router>
  );
};

export default App;
