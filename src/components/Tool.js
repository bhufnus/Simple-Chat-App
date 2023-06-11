import React from "react";
import { useDispatch } from "react-redux";
import { resetCanvas } from "../store/slices/canvas";
import { fetchWords } from "../store/slices/game";

function Tool(tooltype) {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    switch (tooltype.type) {
      case "resetCanvas":
        console.log("handleReset");
        handleResetCanvas();
        break;
      case "fetchWords":
        handleFetchWords();
        break;
      default:
        break;
    }
  };

  const handleResetCanvas = () => {
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

  const handleFetchWords = () => {
    dispatch(fetchWords());
  };

  return (
    <div>
      <button
        id="clear-canvas"
        className="canvas-tool"
        onClick={handleOnClick}
        // TODO: DOMPurify.sanitize this
        dangerouslySetInnerHTML={{ __html: tooltype.display }}
      ></button>
    </div>
  );
}

export default Tool;
