import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { withRouter } from "react-router-dom";

const Landing = (props) => {
  const [formData, setFormData] = useState({
    roomName: "",
    userName: "",
  });

  const { roomName, userName } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = uuid();
    props.history.push(`/room/${roomName}/${userName}/${id}`);
  };
  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
      </header>
      <main className="join-main">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label for="userName">Username</label>
            <input
              type="text"
              name="userName"
              id="userName"
              value={userName}
              placeholder="Enter username..."
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label for="roomName">Room Name</label>
            <input
              type="text"
              name="roomName"
              id="roomName"
              onChange={handleChange}
              value={roomName}
              placeholder="e.g. xyz"
              required
            />
          </div>
          <button type="submit" className="btn">
            Join Chat
          </button>
        </form>
      </main>
    </div>
  );
};

export default Landing;
