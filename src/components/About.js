import React from "react";
import Helmet from "react-helmet";

const About = () => {
  return (
    <div className="layer" style={{ padding: "10px" }}>
      <Helmet>
        <title>About Us - SmartJPG</title>
        <link rel="canonical" href="https://www.smartjpg.app/privacy" />
        <meta name="description" content="SmartJPG Privacy Policy" />
      </Helmet>
      <div className="About">
        <h1>About Us</h1>
        <br />
        <br />
        <h2>Who We Are</h2>
        <p>
          SmartJPG.app is an advanced image compression and optimization
          platform designed to help individuals and businesses reduce image file
          sizes without compromising quality. Our mission is to make image
          optimization fast, efficient, and accessible to everyone.
        </p>
        <br />
        <br />
        <h2>What We Offer</h2>
        <ul>
          <li>⚡ AI-Powered Image Compression</li>
          <li>📸 High-Quality Retention with Smart Algorithms</li>
          <li>🚀 Fast and Secure Online Processing</li>
          <li>📂 Bulk Image Upload and Compression</li>
          <li>🔄 Support for JPG, PNG, and WebP Formats</li>
          <li>🔒 Privacy-Focused – No Data Tracking</li>
        </ul>
        <br />
        <br />
        <h2>Why Choose SmartJPG?</h2>
        <p>
          Unlike traditional image compressors, SmartJPG uses intelligent
          optimization techniques to reduce file sizes while maintaining the
          highest possible quality. Whether you are a photographer, web
          developer, or casual user, SmartJPG helps you save storage, improve
          website loading times, and enhance your overall experience.
        </p>
        <br />
        <h2>Join Us</h2>
        <p>
          Experience the future of image optimization with SmartJPG. Try it
          today and make your images smaller, faster, and better!
        </p>
        <button className="back" onClick={() => (window.location.href = "/")}>
          {" "}
          Go back{" "}
        </button>
      </div>
    </div>
  );
};

export default About;
