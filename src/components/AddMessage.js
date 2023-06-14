import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { addMessage } from "../store/slices/messages";
import { nextQuestion, addScore } from "../store/slices/game";
import { useDispatch, useSelector } from "react-redux";

const AddMessage = () => {
  // TODO: implement setMessage state
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.gameState.currentUser);
  const { currentWord } = useSelector((state) => state.game);
  const inputRef = useRef(null);

  let messageIndex = 0; // used for html list keys but should be in backend

  function handleCorrectAnswer() {
    // go to next word, add to the score
    // TODO: handle score dynamically
    const score = 15;
    dispatch(nextQuestion(score));
  }
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (inputRef.current.value !== "") {
        dispatch(
          addMessage({ message: inputRef.current.value, name: currentUser })
        );

        if (inputRef.current.value === currentWord) {
          handleCorrectAnswer();
        }

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
