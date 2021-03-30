import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import { Link } from "react-router-dom";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "localhost:5000";

  const chatMessages = document.querySelector(".chat-messages");

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);
    console.log(name, room);

    // Join chatroom
    socket.emit("joinRoom", { name, room });

    // Get room and users
    socket.on("roomUsers", ({ room, users }) => {
      outputRoomName(room);
      outputUsers(users);
    });

    // Message from server
    socket.on("message", (message) => {
      outputMessage(message);

      chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    // Message submit
    document.getElementById("chat-form").addEventListener("submit", (e) => {
      e.preventDefault();

      const msg = e.target.elements.msg.value;

      socket.emit("chatMessage", msg);

      e.target.elements.msg.value = "";
      e.target.elements.msg.focus();
    });
  }, [ENDPOINT, location.search]);

  // Output message to DOM
  const outputMessage = (message) => {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `	<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;

    chatMessages.appendChild(div);
  };

  // Add room name to DOM
  const outputRoomName = (room) => {
    document.getElementById("room-name1").innerText = room;
    document.getElementById("room-name2").innerText = room;
  };

  //Add users to DOM
  const outputUsers = (users) => {
    document.getElementById("users1").innerHTML = `${users
      .map((user) => `<li>${user.username}</li>`)
      .join("")}`;
    document.getElementById("users2").innerHTML = `${users
      .map((user) => `<li>${user.username}</li>`)
      .join("")}`;
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
                autoComplete="off"
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
