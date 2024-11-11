import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Pdf from "./components/Pdf";
import Png from "./components/Png";
import About from "./components/About";
import Privacy from "./components/Privacy";
import Theme from "./components/Theme";
import RemoveBg from "./components/RemoveBg";
import Split from "./components/Split";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const App = () => {
  const theme = localStorage.getItem("theme");

  return (
    <Router>
      {/* <Theme /> */}
      <Header />
      <div className={`App ${theme}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/pdf" element={<Pdf />} />
          <Route path="/png" element={<Png />} />
          {/* <Route path="/split" element={<Split />} /> */}
          <Route path="/remove-bg" element={<RemoveBg />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
