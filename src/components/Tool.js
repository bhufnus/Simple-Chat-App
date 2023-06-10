import React from "react";
import { useDispatch } from "react-redux";
import { resetCanvas } from "../store/slices/canvas";

function Tool() {
  const dispatch = useDispatch();
  const handleClearCanvas = () => {
    console.log("clear canvas");
    const initialState = {
      lines: [
        {
          color: "#00000",
          start: null,
          end: null,
          width: null
        }
      ]
    };
    dispatch(resetCanvas(initialState));
  };

  return (
    <div>
      <button
        id="clear-canvas"
        className="canvas-tool"
        onClick={handleClearCanvas}
      >
        Clear
      </button>
    </div>
  );
}

export default Tool;
