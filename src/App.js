import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./components/User/Login/Login";

import ProductDetails from "./components/Products/ProductDetails";
import Home from "./components/Home";

function App() {
  return (
    <div className="masterContainer">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/product/:productId" component={ProductDetails} />
          <Route path="/login" component={LoginScreen} />
          <Route>404 Not Found!</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
