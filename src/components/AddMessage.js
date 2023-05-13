import React, { useRef } from "react";
import PropTypes from "prop-types";

const AddMessage = ({ dispatch }) => {
  const inputRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(inputRef.current.value, "Me");
      inputRef.current.value = "";
    }
  };

  return (
    <section id="new-message">
      <input type="text" ref={inputRef} onKeyPress={handleKeyPress} />
    </section>
  );
};

AddMessage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default AddMessage;
