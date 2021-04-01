import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import { Link } from "react-router-dom";
import Messages from "./Messages";
import Users from "./Users";

let socket;
/* let ENDPOINT; */

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState([]);

  const [messages, setMessages] = useState([]);

  const ENDPOINT = "https://veesee.herokuapp.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    /* if (process.env.NODE_ENV === "development") {
      ENDPOINT = "localhost:5000";
    }

    if (process.env.NODE_ENV === "production") {
      ENDPOINT = "https://veesee.herokuapp.com/";
    } */

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    // Join chatroom
    socket.emit("joinRoom", { name, room });

    return () => {
      socket.emit("disconnect");

      socket.close();
    };
  }, [location.search]);

  useEffect(() => {
    // Message from server
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    // Get room and users
    socket.on("roomUsers", ({ room, users }) => {
      setUsers([...users, users]);
    });
  }, [room, users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let chatMessages = document.querySelector(".chat-messages");
    if (msg) {
      socket.emit("chatMessage", msg);
      setMsg("");
      document.getElementById("msg").focus();
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  };

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
          <h5>{room}</h5>
        </div>
        <div>
          <h6>
            <i className="fas fa-users"></i> Users
          </h6>
          <ul id="users1">
            <Users users={users} />
          </ul>
        </div>
      </div>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h4>
            <i className="fas fa-comments"></i> Room Name
          </h4>
          <h2>{room}</h2>
          <h4>
            <i className="fas fa-users"></i> Users
          </h4>
          <ul id="users2">
            <Users users={users} />
          </ul>
        </div>
        <div className="chat-box">
          <div className="chat-messages">
            <Messages messages={messages} />
          </div>
          <div className="chat-form-container shadow-lg">
            <form id="chat-form" onSubmit={handleSubmit}>
              <input
                id="msg"
                type="text"
                placeholder="Enter Message"
                required
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                name="msg"
                autoComplete="off"
              />
              <button className="chat-form-btn" type="submit">
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
