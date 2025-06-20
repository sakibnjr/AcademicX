import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import ProjectClosed from "./updates/ProjectClosed.jsx";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ProjectClosed />
  </React.StrictMode>,
);
