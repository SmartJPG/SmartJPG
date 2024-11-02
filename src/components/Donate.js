import React from "react";
import { motion } from "framer-motion";
import "../App.css";

const Donate = ({ counting }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
    className="donate-container"
    style={{
      position: "absolute",
      maxWidth: "400px",
      width: "100%",
      bottom: "20px",
      right: "20px",
      borderRadius: "20px",
      backgroundColor: "white",
      textAlign: "center",
      padding: "30px 40px",
      zIndex: "2",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    }}
  >
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-20px",
          right: "-35px",
          fontWeight: "600",
          padding: "5px 10px",
          color: "white",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          width: "40px",
          height: "40px",
        }}
        className="gradient-border"
      >
        <span>{counting}</span>
      </div>

      <h1>Support us! ☕️</h1>
      <p>Your support can help us keep developing free resources.</p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://buymeacoffee.com/leohoncana1"
      >
        <img
          align="center"
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          height="50"
          width="210"
          alt="Donate us"
        />
      </a>
    </div>
  </motion.div>
);

export default Donate;
