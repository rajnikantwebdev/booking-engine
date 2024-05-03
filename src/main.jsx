import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "/index.css";
import { Reducer } from "./utils/getDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Reducer>
      <App />
    </Reducer>
  </React.StrictMode>
);
