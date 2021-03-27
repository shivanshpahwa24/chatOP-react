import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

const Chat = (props) => {
  const [msg, setMsg] = useState("");

  const userName = props.match.params.userName;
  const roomName = props.match.params.roomName;
  const id = props.match.params.id;
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("/");
  }, []);

  // Join chatroom
  socketRef.current.emit("joinRoom", { userName, roomName });

  // Get room and users
  socketRef.current.on("roomUsers", ({ roomName, users }) => {
    outputRoomName(roomName);
    outputUsers(users);
  });

  // Message from server
  socketRef.current.on("message", (message) => {
    console.log(message);
    outputMessage(message);
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

  // Message submit
  const handleSubmit = (e) => {
    e.preventDefault();
    socketRef.current.emit("chatMessage", msg);
    setMsg("");
    e.target.elements.msg.focus();
  };

  // Output message to DOM
  const outputMessage = (message) => {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `	<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.appendChild(div);
  };

  // Add room name to DOM
  const outputRoomName = (roomName) => {
    document.getElementById("room-name").innerText = roomName;
  };

  //Add users to DOM
  const outputUsers = (users) => {
    document.getElementById("users").innerHTML = `${users
      .map((user) => `<li>${user.username}</li>`)
      .join("")}`;
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
        <Link to="/" className="btn">
          Leave Room
        </Link>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3>
            <i className="fas fa-comments"></i> Room Name:
          </h3>
          <h2 id="room-name"></h2>
          <h3>
            <i className="fas fa-users"></i> Users
          </h3>
          <ul id="users"></ul>
        </div>
        <div className="chat-messages"></div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form" onSubmit={handleSubmit}>
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autocomplete="off"
            value={msg}
            onChange={setMsg(msg)}
          />
          <button type="submit" className="btn">
            <i className="fas fa-paper-plane"></i> Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
