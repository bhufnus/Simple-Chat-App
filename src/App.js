import "./App.css";
import Sidebar from "./components/Sidebar";

import AddMessage from "./components/AddMessage";
import MessagesList from "./components/MessagesList";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import Words from "./components/Words";

function App() {
  return (
    <div>
      <div id="word-select">
        <Words />
      </div>
      <div id="canvas-area">
        <div id="canvas">
          <Canvas
            width={window.innerWidth / 2}
            height={window.innerHeight / 2}
          />
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

export default App;
