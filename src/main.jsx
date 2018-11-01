import React from "react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";

import promise from "redux-promise";
import multi from "redux-multi";
import thunk from "redux-thunk";

import Routes from "./routes/routes";
import reducers from "./reducers";
import Messages from "./common/tools/Messages";

class Main extends React.Component {
  constructor(props) {
    super(props);

    const devTools =
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__();

    const store = applyMiddleware(thunk, multi, promise)(createStore)(
      reducers,
      devTools
    );

    this.state = {
      store
    };
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <div>
          <Routes />
          <Messages />
        </div>
      </Provider>
    );
  }
}

export default Main;
