import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Pdf from "./components/Pdf";
import SignPdf from "./components/SignPdf";
import Png from "./components/Png";
import About from "./components/About";
import Privacy from "./components/Privacy";
import RemoveBg from "./components/RemoveBg";
import ImageGenerator from "./components/ImageGenerator";
import Chat from "./components/Chat";
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
  const page = localStorage.getItem("page");
  useEffect(() => {
    if (!page) {
      localStorage.setItem("page", "");
    }
  }, [page]);

  useEffect(() => {
    if (theme) {
      document.body.classList.add(theme);
    } else {
      document.body.classList.add("default");
    }

    return () => {
      document.body.classList.remove("night", "pro", "default");
    };
  }, [theme]);

  return (
    <Router>
      <Header />
      <div className={`App ${theme}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/pdf" element={<Pdf />} />
          <Route path="/sign-pdf" element={<SignPdf />} />
          <Route path="/png" element={<Png />} />
          <Route path="/ai-image" element={<ImageGenerator />} />
          <Route path="/remove-bg" element={<RemoveBg />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
