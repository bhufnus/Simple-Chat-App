import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { addMessage } from "../store/slices/messages";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

const AddMessage = () => {
  const socket = io("http://localhost:8989");

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.gameState.currentUser);
  const inputRef = useRef(null);

  let messageIndex = 0; // used for html list keys but should be in backend

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (inputRef.current.value !== "") {
        // make this a socket event instead, then have the socket event call this dispatch.
        // console.log("Socket?", inputRef.current.value);
        socket.emit(
          "message",
          JSON.stringify({
            type: addMessage.type,
            message: inputRef.current.value,
            name: currentUser
          })
        );

        dispatch(
          addMessage({
            message: inputRef.current.value,
            author: currentUser,
            id: messageIndex++
          })
        );
        inputRef.current.value = "";
      }
    }
  };

  return (
    <section id="new-message">
      <input type="text" ref={inputRef} onKeyDown={handleKeyPress} />
    </section>
  );
};

// AddMessage.propTypes = {
//   dispatch: PropTypes.func.isRequired
// };

export default AddMessage;

// import React, { useRef, useState } from "react";
// import PropTypes from "prop-types";
// import { addMessage } from "../reducers/messages";
// import { useDispatch } from "react-redux";

// const AddMessage = () => {
//   const [message, setMessage] = useState("");
//   const dispatch = useDispatch();
//   const inputRef = useRef(null);

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       if (inputRef.current.value !== "") {
//         // TODO: send username with message
//         dispatch(addMessage(inputRef.current.value));
//         inputRef.current.value = "";
//       }
//     }
//   };

//   return (
//     <section id="new-message">
//       <input type="text" ref={inputRef} onKeyPress={handleKeyPress} />
//     </section>
//   );
// };

// // AddMessage.propTypes = {
// //   dispatch: PropTypes.string.isRequired
// // };

// export default AddMessage;
