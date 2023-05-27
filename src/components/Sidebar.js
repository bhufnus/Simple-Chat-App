import React from "react";
import propTypes from "prop-types";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { users } = useSelector((state) => state.users);
  console.log("USERS:", users);

  return (
    <aside id="sidebar" className="sidebar">
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
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
