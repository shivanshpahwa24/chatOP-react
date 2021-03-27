import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Chat from "./components/Chat";
import "./App.css";
import socketIOClient from "socket.io-client";
const SERVER = "http://127.0.0.1:5000";

function App() {
  var socket = socketIOClient(SERVER);
  socket.on("connection", () => {
    console.log(`I'm connected with the back-end`);
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            component={(props) => <Landing {...props} socket={socket} />}
          />

          <Route
            path="/room/:roomName/:userName"
            component={(props) => <Chat {...props} socket={socket} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
