import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Smartify from "./components/Smartify";
import Jpg from "./components/Jpg";
import Pdf from "./components/Pdf";
import SignPdf from "./components/SignPdf";
import Png from "./components/Png";
import About from "./components/About";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import RemoveBg from "./components/RemoveBg";
import ImageGenerator from "./components/ImageGenerator";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/smartify" element={<Smartify />} />
          {/* <Route path="/jpg" element={<Jpg />} /> */}
          {/* <Route path="/pdf" element={<Pdf />} /> */}
          {/* <Route path="/sign-pdf" element={<SignPdf />} /> */}
          {/* <Route path="/png" element={<Png />} /> */}
          {/* <Route path="/ai-image" element={<ImageGenerator />} /> */}
          {/* <Route path="/remove-bg" element={<RemoveBg />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
