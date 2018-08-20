import React, { Component } from "react";
import Loadable from "react-loadable";
import logo from "./logo.svg";
import "./App.scss";

const AsyncComponent = Loadable({
  loader: () => import("./SomeComponent"),
  loading: () => <div>loading...</div>
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React in the Server</h2>
        </div>
        <p className="App-intro">Isn't this cool?</p>
        <AsyncComponent />
      </div>
    );
  }
}
export default App;
