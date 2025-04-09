import React from "react";
import Navigation from "./components/navigation"; 


export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <main>{children}</main> {/* This is where each page's content will go */}
    </>
  );
}
