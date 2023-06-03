import React, { useRef, useEffect } from "react";

export function useOnDraw(onDraw) {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const prevPointRef = useRef(null);

  const handleMouseDown = (e) => {
    isDrawingRef.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isDrawingRef.current) return;
    const point = computePointInCanvas(e.clientX, e.clientY);
    const ctx = canvasRef.current.getContext("2d");
    if (onDraw) onDraw(ctx, point, prevPointRef.current);
    prevPointRef.current = point;
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
    prevPointRef.current = null;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onDraw]);

  function computePointInCanvas(clientX, clientY) {
    if (!canvasRef.current) return null;
    const boundingRect = canvasRef.current.getBoundingClientRect();
    return {
      x: clientX - boundingRect.left,
      y: clientY - boundingRect.top
    };
  }

  return canvasRef;
}

// // onDraw = onDraw(ctx, point, prevPoint) {drawLine(prevPoint, point, ctx, "#00000", 5);}
// export function useOnDraw(onDraw) {
//   // initialize all refs we will be using

//   const canvasRef = useRef(null);
//   const isDrawingRef = useRef(false);

//   const mouseMoveListenerRef = useRef(null);
//   const mouseDownListenerRef = useRef(null);
//   const mouseUpListenerRef = useRef(null);

//   const prevPointRef = useRef(null);

//   // cleanup event listeners from previous render:
//   useEffect(() => {
//     return () => {
//       if (mouseMoveListenerRef.current) {
//         window.removeEventListener("mousemove", mouseUpListenerRef.current);
//       }
//       if (mouseUpListenerRef.current) {
//         window.removeEventListener("mouseup", mouseUpListenerRef.current);
//       }
//     };
//   }, []);

//   // CODE FLOW STARTS HERE
//   function setCanvasRef(ref) {
//     if (!ref) return;
//     if (canvasRef.current) {
//       canvasRef.current.removeEventListener(
//         "mousedown",
//         mouseDownListenerRef.current
//       );
//     }
//     // ref = <canvas width=​"478.5" height=​"462.5" style=​"border:​ 1px solid black;​">​

//     canvasRef.current = ref;
//     initMouseMoveListener();
//     initMouseDownListener();
//     initMouseUpListener();
//   }

//   function initMouseMoveListener() {
//     const listener = () => {
//       isDrawingRef.current = false;
//       prevPointRef.current = null;
//     };
//     const mouseMoveListener = (e) => {
//       if (isDrawingRef.current) {
//         const point = computePointInCanvas(e.clientX, e.clientY);
//         const ctx = canvasRef.current.getContext("2d");
//         if (onDraw) onDraw(ctx, point, prevPointRef.current);
//         prevPointRef.current = point;

//         // console.log(point);
//       }
//     };
//     mouseUpListenerRef.current = listener;
//     window.addEventListener("mousemove", mouseMoveListener);
//   }

//   function initMouseUpListener() {
//     const listener = () => {
//       isDrawingRef.current = false;
//       // CURSE 1 = One Line Drawing - comment out the following line so that you cannot pick the pen up from the canvas
//       prevPointRef.current = false;
//     };
//     mouseDownListenerRef.current = listener;

//     window.addEventListener("mouseup", listener);
//   }

//   function initMouseDownListener() {
//     if (!canvasRef.current) return;
//     const listener = () => {
//       isDrawingRef.current = true;
//     };
//     canvasRef.current.addEventListener("mousedown", listener);
//   }

//   function computePointInCanvas(clientX, clientY) {
//     if (canvasRef.current) {
//       const boundingRect = canvasRef.current.getBoundingClientRect();
//       return {
//         x: clientX - boundingRect.left,
//         y: clientY - boundingRect.top
//       };
//     } else {
//       return null;
//     }
//   }

//   return setCanvasRef;
// }
