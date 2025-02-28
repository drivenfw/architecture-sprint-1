import ReactDOM from "react-dom/client";
import AddPlace from "./components/AddPlace";
import Gallery from "./components/Gallery";

import "./index.css";

const App = () => (
  <div className="container">
    <AddPlace />
    <Gallery />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);