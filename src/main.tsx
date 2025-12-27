import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app/layout/App";
import { mockWorker } from "./mocks/browser";
import "./index.css";

mockWorker.start().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
