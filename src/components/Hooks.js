import React, { useRef, useEffect } from "react";

let lines = [];
let currentLine = [];

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
    currentLine.push(point);
    const ctx = canvasRef.current.getContext("2d");
    if (onDraw) onDraw(ctx, point, prevPointRef.current);
    prevPointRef.current = point;
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
    lines.push(currentLine);
    // TODO: discard any empty clicks or clicks off the canvas
    console.log("CRRNT", currentLine);
    currentLine = [];
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
