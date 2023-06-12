import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { addMessage } from "../store/slices/messages";
import { nextQuestion, addScore } from "../store/slices/game";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

const AddMessage = () => {
  // HANDLE SOCKET EVENT INSIDE SAGA NOT HERE
  const socket = io("http://localhost:8989");

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.gameState.currentUser);
  const { selectedWord } = useSelector((state) => state.game);
  const inputRef = useRef(null);

  let messageIndex = 0; // used for html list keys but should be in backend

  function isMessageCorrectAnswer(message) {
    if (message === selectedWord) {
      console.log(selectedWord);
      // go to next word, add to the score
      dispatch(addScore({ score: 15 }));
      dispatch(nextQuestion());
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (inputRef.current.value !== "") {
        dispatch(
          addMessage({ message: inputRef.current.value, name: currentUser })
        );
        isMessageCorrectAnswer(inputRef.current.value);
        // for saga, instead of socket event, do a dispatch event that sends this emit message through a saga
        // socket.emit(
        //   "message",
        //   JSON.stringify({
        //     type: addMessage.type,
        //     message: inputRef.current.value,
        //     name: currentUser
        //   })
        // );

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
