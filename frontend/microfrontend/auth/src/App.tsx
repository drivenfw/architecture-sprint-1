import ReactDOM from "react-dom/client";
import AuthTest from './components/AuthTest';

import "./index.css";

const App = () => (
  <div className="container">
    <AuthTest />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);