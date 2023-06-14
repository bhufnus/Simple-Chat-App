import React, { useState, useEffect } from "react";
import AddMessage from "../components/AddMessage";
import MessagesList from "../components/MessagesList";
import Canvas from "../components/Canvas";
import Toolbar from "../components/Toolbar";
import Words from "../components/Words";
import Sidebar from "../components/Sidebar";

function GamePage() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
  });

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // TODO: UNCOMMENT TO SCALE CANVAS SIZE TO WINDOW SIZE
  //   useEffect(() => {
  //     function handleResize() {
  //       setDimensions({
  //         height: window.innerHeight / 2,
  //         width: window.innerWidth / 2
  //       });
  //     }
  //     window.addEventListener("resize", handleResize);
  //     // Clean up the event listener on component unmount
  //     return () => window.removeEventListener("resize", handleResize);
  //   }, []); // Empty array ensures this runs once on mount and unmount, not on updates

  return (
    <div>
      <div className="timer">
        <p>{timeLeft}</p>
      </div>
      <div id="word-select">
        <Words />
      </div>
      <div id="canvas-area">
        <div id="canvas">
          <Canvas width={dimensions.width} height={dimensions.height} />
        </div>
        <div id="toolbar">
          <Toolbar />
        </div>
      </div>
      <div id="container">
        <aside id="sidebar">
          <h1 style={{ color: "blue", paddingLeft: 20 }}>Users</h1>
          <Sidebar />
        </aside>
        <section id="main">
          <MessagesList />

          <AddMessage />
        </section>
      </div>
    </div>
  );
}

export default GamePage;
