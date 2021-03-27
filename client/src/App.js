import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
import Landing from "./components/Landing";
import Chat from "./components/Chat";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/room/:roomName/:userName/:id" component={Chat} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
