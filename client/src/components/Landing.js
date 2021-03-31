import React, { useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [formData, setFormData] = useState({
    roomName: "",
    userName: "",
  });

  const { roomName, userName } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="join-container-align">
      <div className="join-container">
        <header className="join-header">
          <h1>
            <i className="far fa-comment-dots"></i> ChatOP
          </h1>
        </header>
        <main className="join-main">
          <form>
            <div className="form-control">
              <label htmlFor="userName">Username</label>
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
              <label htmlFor="roomName">Room Name</label>
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
            <Link to={`/chat?name=${userName}&room=${roomName}`}>
              <button className="btn1" type="submit">
                Join Chat
              </button>
            </Link>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Landing;
