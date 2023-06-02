import { useOnDraw } from "./Hooks";

// all the visuals
const Canvas = ({ width, height }) => {
  const setCanvasRef = useOnDraw(onDraw);

  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, "#00000", 5); // GAME FEATURE: modifying the fifth value in drawLine creates a cool 'brush' feel
  }

  function drawLine(start, end, ctx, color, width) {
    start = start ?? end; // If start is not explicitly provided, the line should start and end at the same point, creating a dot.
    ctx.beginPath(); // starts a new PATH by emptying the list of sub-paths
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y); // begins a new SUBPATH at the point specified by the given (x,y) coordinates
    ctx.lineTo(end.x, end.y); //   // draws (but doesn't render) a line from the subpath's last point to the specified x,y coordinates
    ctx.stroke(); // actually renders/draws the line (dot)
    ctx.fillStyle = color; // fills the dot with the color black
    ctx.beginPath(); // starts a new path by emptying the list of sub-paths
    // NOTE: to make thicker brush, modify the radius of the arc (third paramater)
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI); // adds a circular arc to the current sub-path (literally a dot)
    ctx.fill(); // fills current path (dot) with {fillStyle}
  }

  // need to send drawLine parameters to websocket
  // socket.emit('drawing', {
  //   start: {
  //       x: current.x,
  //       y: current.y,
  //   },
  //   end: {
  //       x: (e.clientX - rect.left) / w,
  //       y: (e.clientY - rect.top) / h,
  //   },

  return (
    <canvas
      width={width}
      height={height}
      style={canvasStyle}
      ref={setCanvasRef}
    />
  );
};

export default Canvas;

const canvasStyle = {
  border: "1px solid black"
  //   width: `${window.innerWidth}px`,
  //   height: `${window.innerHeight}px`
};

// The drawLine function takes five parameters: start, end, ctx, color, and width. start and end represent the starting and ending coordinates of the line to be drawn. ctx is the canvas rendering context obtained from the canvas element's getContext method. color represents the color of the line and dot, and width determines the line's thickness.

// The line's starting point is set to start if it is not null using the nullish coalescing operator (??). This means that if start is null or undefined, it will be set to end. This is useful for cases where start is not explicitly provided, and the line should start and end at the same point, creating a dot.

// ctx.beginPath() is called to start a new path. This clears the current list of sub-paths and prepares the canvas to draw a new shape.

// The line's width and color are set using ctx.lineWidth and ctx.strokeStyle, respectively.

// ctx.moveTo(start.x, start.y) sets the starting point of the sub-path for drawing the line.

// ctx.lineTo(end.x, end.y) adds a straight line segment from the current sub-path's last point to the specified end coordinates.

// ctx.stroke() is called to actually render the line on the canvas.

// The dot is drawn by setting ctx.fillStyle to the specified color.

// ctx.beginPath() is called again to start a new path for the dot.

// ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI) adds a circular arc (a dot) to the current sub-path. The start.x and start.y coordinates determine the center of the dot, 2 is the radius, and 0 and 2 * Math.PI specify the start and end angles of the arc, covering a complete circle.

// ctx.fill() is called to fill the current sub-path (the dot) with the specified fillStyle color.

// In the component's return statement, a canvas element is rendered with the specified width and height. The canvas element also receives a style attribute to apply additional custom styling if desired. The ref is set using setCanvasRef, which is a function that likely uses the useRef hook to create a reference to the canvas element for further manipulation or interaction.
