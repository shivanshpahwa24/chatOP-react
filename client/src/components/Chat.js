import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import { Link } from "react-router-dom";
const ENDPOINT = "localhost:5000";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
  }, [ENDPOINT, location.search]);

  return (
    <div className="chat-container">
      <header className="chat-header shadow sticky-top">
        <h3>
          <i className="far fa-comment-dots"></i> ChatOP
        </h3>
        <Link to="/" className="btn1 shadow-sm">
          <i className="fas fa-sign-out-alt"></i>
          Leave Room
        </Link>
      </header>
      <div className="chat-upperbar">
        <div>
          <h6>
            <i className="fas fa-comments"></i> Room Name
          </h6>
          <h5 id="room-name1"></h5>
        </div>
        <div>
          <h6>
            <i className="fas fa-users"></i> Users
          </h6>
          <ul id="users1"></ul>
        </div>
      </div>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h4>
            <i className="fas fa-comments"></i> Room Name
          </h4>
          <h2 id="room-name2"></h2>
          <h4>
            <i className="fas fa-users"></i> Users
          </h4>
          <ul id="users2"></ul>
        </div>
        <div className="chat-box">
          <div className="chat-messages"></div>
          <div className="chat-form-container shadow-lg">
            <form id="chat-form">
              <input
                id="msg"
                type="text"
                placeholder="Enter Message"
                required
                autocomplete="off"
              />
              <button className="chat-form-btn">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
