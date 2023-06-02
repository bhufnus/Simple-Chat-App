import React, { useEffect } from "react";
import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const { users } = useSelector((state) => state.users);
  // console.log("USERS:", users);

  return (
    <aside id="sidebar" className="sidebar">
      <ul>
        {users.map((user) => (
          <li key={user.socketId}>{user.name}</li>
        ))}
      </ul>
    </aside>
  );
};

// Sidebar.propTypes = {
//   users: propTypes.arrayOf(
//     propTypes.shape({
//       id: propTypes.number.isRequired,
//       name: propTypes.string.isRequired
//     }).isRequired
//   ).isRequired
// };

export default Sidebar;
