import React from "react";
import propTypes from "prop-types";
import Message from "./Message";
import { useSelector } from "react-redux";

const MessagesList = () => {
  const { messages } = useSelector((state) => state.messages);
  // console.log("MESSAGES:", messages);
  return (
    <section id="messages-list">
      <ul>
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </ul>
    </section>
  );
};

// MessagesList.propTypes = {
//   messages: propTypes.arrayOf(
//     propTypes.shape({
//       id: propTypes.number.isRequired,
//       message: propTypes.string.isRequired,
//       author: propTypes.string.isRequired
//     }).isRequired
//   ).isRequired
// };

export default MessagesList;
