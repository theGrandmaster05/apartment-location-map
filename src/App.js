import React from "react";
import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Map from "./pages/map";
import CreateAd from "./pages/create-ad";

const GlobalStyles = createGlobalStyle`
  ${normalize()};
`;

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={Map} />
        <Route path={"/create"} component={CreateAd} />
      </Switch>
      <GlobalStyles />
    </Router>
  );
}

export default App;
