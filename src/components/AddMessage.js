import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { addMessage } from "../reducers/messages";
import { useDispatch, useSelector } from "react-redux";

const AddMessage = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const inputRef = useRef(null);

  let messageIndex = 0; // used for html list keys but should be in backend

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (inputRef.current.value !== "") {
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
