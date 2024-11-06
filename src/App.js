import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Pdf from "./components/Pdf";
import Png from "./components/Png";
import About from "./components/About";
import Theme from "./components/Theme";
import RemoveBg from "./components/RemoveBg";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const theme = localStorage.getItem("theme");

  return (
    <Router>
      <Theme />

      {/* <div className="line-container">
        <div className="line-background">
          <svg
            width="554"
            height="543"
            viewBox="0 0 554 543"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M39 543C39 377.918 243 364.44 243 173.01V1.50026M77 543C77 377.918 344 364.44 344 173.01V1.50026M115 543C115 377.918 450.5 364.44 450.5 173.01C450.5 -18.419 450.5 1.50026 450.5 1.50026M153 543C153 392 553 410 553 178.898V1.50026M0.5 543C0.5 377.5 140 394 140 173.01V1.5"
              stroke="gray"
            ></path>
          </svg>
        </div>
      </div> */}

      <div className={`App ${theme}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pdf" element={<Pdf />} />
          <Route path="/png" element={<Png />} />
          <Route path="/remove-bg" element={<RemoveBg />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
