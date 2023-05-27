import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { addMessage } from "../reducers/messages";
import { useDispatch } from "react-redux";

const AddMessage = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (inputRef.current.value !== "") {
        // TODO: send username with message
        dispatch(addMessage(inputRef.current.value));
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

AddMessage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

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
