import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App"; // Import App with all routes
import Buttons from "./components/buttons";
import FeatureCard from "./components/featurecard";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <Buttons /> */}
    {/* <FeatureCard /> */}
  </StrictMode>
);
