import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Pdf from "./components/Pdf";
import About from "./components/About";
import Theme from "./components/Theme";
import "./App.css";

const App = () => {
  const theme = localStorage.getItem("theme");

  return (
    <Router>
      <Theme />
      <div className={`App ${theme}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pdf" element={<Pdf />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
