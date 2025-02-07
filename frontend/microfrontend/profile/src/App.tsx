import ReactDOM from "react-dom/client";
import Profile from './components/Profile';

import "./index.css";

const App = () => (
  <div className="container">
    <Profile />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);