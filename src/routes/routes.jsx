import React from "react";
import {
  HashRouter,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import App from "../main/app";

class Routes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Redirect from="*" to="/" />
        </Switch>
      </HashRouter>
    );
  }
}

export default Routes;
