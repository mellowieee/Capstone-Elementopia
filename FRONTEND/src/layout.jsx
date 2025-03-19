import React from "react";
import Navigation from "./components/navigation"; // Import navbar
import Footer from "./components/footer"; // Import footer

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <main>{children}</main> {/* This is where each page's content will go */}
      <Footer />
    </>
  );
}
