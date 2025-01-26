import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import "./index.css";

import Working from "./updates/Working.jsx";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <SkeletonTheme baseColor="#848b95" highlightColor="#444">
    <Router>
      <Working />
    </Router>
  </SkeletonTheme>,
);
