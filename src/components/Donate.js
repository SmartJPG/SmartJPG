import React from "react";
import { motion } from "framer-motion";
import "../App.css";

const Donate = ({ counting }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
    className="donate-container"
  >
    <div className="countdown">{counting}</div>
    <h1>Support us! ☕️</h1>
    <p>Your support can help us keep developing free resources.</p>
    <a
      href="https://buymeacoffee.com/leohoncana1"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
        alt="Donate us"
      />
    </a>
  </motion.div>
);

export default Donate;
