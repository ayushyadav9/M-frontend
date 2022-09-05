import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./components/User/Login/Login";
import Home from "./components/Home";
import Category from "./components/Products/Category";
require("dotenv").config();

function App() {
  return (
    <div className="masterContainer">
      <div className="progressBar"></div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/category/:category" component={Category} />
          <Route path="/gender/:gender" component={Category} />
          <Route path="/login" component={LoginScreen} />

          <Route>404 Not Found!</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;