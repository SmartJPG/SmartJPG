import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Smartify from "./components/Smartify";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import "./App.css";
// import { pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

import { GlobalWorkerOptions } from "pdfjs-dist";
GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const App = () => {
  const page = localStorage.getItem("page");

  useEffect(() => {
    if (!page) {
      localStorage.setItem("page", "");
    }
  }, [page]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/smartify" element={<Smartify />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
