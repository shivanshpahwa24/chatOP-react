import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Chat from "./components/Chat";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
