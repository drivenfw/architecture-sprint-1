import ReactDOM from "react-dom/client";
import Login from "./components/Login";
import Register from "./components/Register";

import "./index.css";

const App = () => (
  <div className="container">
    <Login />
    <Register />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);