import React from "react";
const Message = ({ message, name }) => {
  return (
    <>
      {message.name === name ? (
        <div className="message-contaniner message-align-self">
          <p className="message-name-tag">You</p>
          <div className="message">
            <div className="text">{message.text}</div>
            <div className="meta">{message.time}</div>
          </div>
        </div>
      ) : message.name === "ChatOP Bot" ? (
        <div className="message-contaniner message-align-bot">
          <div className="message">
            <div className="text">{message.text}</div>
          </div>
        </div>
      ) : (
        <div className="message-contaniner message-align-others">
          <div className="message">
            <div className="text">{message.text}</div>
            <div className="meta">{message.time}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
