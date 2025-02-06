import ReactDOM from "react-dom/client";
import GalleryTest from "./components/GalleryTest";

import "./index.css";

const App = () => (
  <div className="container">
    <GalleryTest />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);