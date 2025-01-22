import React from "react";
import ReactDOM from "react-dom/client";
import App from "./NewFeatures/App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SkeletonTheme } from "react-loading-skeleton";
//import "react-loading-skeleton/dist/skeleton.css"; // Skeleton styles

import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import "./index.css";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <Router>
      <App />
    </Router>
  </SkeletonTheme>
);
