import ReactDOM from "react-dom/client";
import ProfileTest from './components/ProfileTest';

import "./index.css";

const App = () => (
  <div className="container">
    <ProfileTest />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);