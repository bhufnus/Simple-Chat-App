// Container for all the canvas tools. Clear canvas, undo, change brush, etc.

import React from "react";
import Tool from "./Tool";

function Toolbar() {
  return (
    <div>
      <Tool type="resetCanvas" display="Clear" />
      <Tool type="fetchWords" display="Fetch Words" />
    </div>
  );
}

export default Toolbar;
