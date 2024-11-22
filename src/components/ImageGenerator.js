import React from "react";
import "../App.css";
import Main from "./Main";
import { Helmet } from "react-helmet";

const ImageGenerator = (page) => (
  <div className="Image">
    <Helmet>
      <title>AI Image Generator | SmartJPG</title>
      <link rel="canonical" href="https://www.smartjpg.com/ai-image" />
      <meta
        name="description"
        content="Generate AI images, convert formats, and remove backgrounds. Create unique artwork and convert between HEIC, PNG, WEBP, and AVIF formats."
      />
    </Helmet>
    <Main page="ai-image" />
  </div>
);

export default ImageGenerator;
