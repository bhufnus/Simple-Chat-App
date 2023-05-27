import "./App.css";
import Sidebar from "./components/Sidebar";
import { MessagesList } from "./containers/MessagesList";
// import { AddMessage } from "./containers/AddMessage";
import AddMessage from "./components/AddMessage";

function App() {
  return (
    <div id="container">
      <aside id="sidebar">
        Users <Sidebar />
      </aside>
      <section id="main">
        {/* <MessagesList /> */}

        <AddMessage />
      </section>
    </div>
  );
}

export default App;
{
  /* <Sidebar />; */
}
