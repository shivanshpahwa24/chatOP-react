import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import { Link } from "react-router-dom";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState([]);
  const ENDPOINT = "localhost:5000";
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    // Join chatroom
    socket.emit("joinRoom", { name, room });

    // Get room and users
    socket.on("roomUsers", ({ room, users }) => {
      setUsers(users);
    });

    // Message from server
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [ENDPOINT, location.search]);

  // Output message to DOM
  const OutputMessage = (messages) => {
    /*  document.querySelector(".chat-messages").scrollTop = document.querySelector(
      ".chat-messages"
    ).scrollHeight; */
    console.log(messages);
    return <div></div>;
    /* return (
      <>
        {messages.map((message) => (
          <div className="message">
            <p className="meta">
              {message.username} <span>{message.time}</span>
            </p>
            <p className="text">{message.text}</p>
          </div>
        ))}
      </>
    ); */
  };

  //Add users to DOM
  const OutputUsers = (users) => {
    console.log(users);
    return <div></div>;
    /* return (
      <>
        {users.map((user) => (
          <li>{user.username}</li>
        ))}
      </>
    ); */
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("chatMessage", msg);

    setMsg("");
    OutputUsers(users);
    OutputMessage(messages);
    document.getElementById("msg").focus();
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
          <ul id="users1">{/* <OutputUsers users={users} /> */}</ul>
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
          <ul id="users2">{/* {users && <OutputUsers users={users} />} */}</ul>
        </div>
        <div className="chat-box">
          <div className="chat-messages">
            {/* <OutputMessage messages={messages} /> */}
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
