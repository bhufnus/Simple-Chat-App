import "./App.css";
import Sidebar from "./components/Sidebar";

import AddMessage from "./components/AddMessage";
import MessagesList from "./components/MessagesList";

function App() {
  return (
    <div id="container">
      <aside id="sidebar">
        Users <Sidebar />
      </aside>
      <section id="main">
        <MessagesList />

        <AddMessage />
      </section>
    </div>
  );
}

export default App;
{
  /* <Sidebar />; */
}
