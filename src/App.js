import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Pdf from "./components/Pdf";
import About from "./components/About";
import "./App.css";

const App = () => {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      setIsNight(true);
    }
  }, []);

  return (
    <Router>
      <div className={`App ${isNight ? "night" : ""}`}>
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
