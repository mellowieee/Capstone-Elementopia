import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App"; // Import App with all routes
import Buttons from "./components/buttons";
import FeatureCard from "./components/featurecard";
import Login from "./STUDENT/login-card";
import CreateLab from "./STUDENT/create-lab";
import CustomRoomView from "./STUDENT/custom-room";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    {/* <App /> */}
    {/* <Buttons /> */}
    {/* <FeatureCard /> */}
    {/* <Login /> */}
    {/* <CreateLab /> */}
    <CustomRoomView />
     </BrowserRouter>
  </StrictMode>
);
