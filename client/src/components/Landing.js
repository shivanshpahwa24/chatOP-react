import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const Landing = () => {
  const [formData, setFormData] = useState({
    roomName: "",
    userName: "",
  });
  const [join, setJoin] = useState(false);

  const { roomName, userName } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setJoin(true);
  };
  return (
    <div className="join-container-align">
      <div className="join-container">
        <header className="join-header">
          <h2>
            <i className="far fa-comment-dots"></i> ChatOP
          </h2>
        </header>
        <div className="join-main">
          <form onSubmit={handleSubmit}>
            <div className="form-control1">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="userName"
                id="userName"
                value={userName}
                onChange={handleChange}
                placeholder="Enter username..."
                required
              />
            </div>
            <div className="form-control1">
              <label htmlFor="room">Room</label>
              <input
                type="text"
                name="roomName"
                id="roomName"
                value={roomName}
                onChange={handleChange}
                placeholder="Enter room name (e.g. ABCDE)"
                required
              />
            </div>
            {/* <Link
              onClick={(event) =>
                !userName || !roomName ? event.preventDefault() : null
              }
              to={`/chat?name=${userName}&room=${roomName}`}
            > */}
            <button className="btn1" type="submit">
              Join Chat
            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
      {join && <Redirect to={`/chat?name=${userName}&room=${roomName}`} />}
    </div>
  );
};

export default Landing;
