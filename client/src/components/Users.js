import React from "react";

const Users = ({ users }) => {
  return (
    <>
      {users.map((user, i) => (
        <li key={i}>{user.name}</li>
      ))}
    </>
  );
};

export default Users;
