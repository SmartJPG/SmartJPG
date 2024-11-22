import React from "react";
import Main from "./Main";
import { Helmet } from "react-helmet";
import Description from "./Description";

const Png = () => {
  return (
    <div className="PNG">
      <Helmet>
        <title>
          Convert images to PNG - High-Quality Image Conversion | SmartJPG
        </title>
        <link rel="canonical" href="https://www.smartjpg.com/png" />
        <meta
          name="description"
          content="Learn more about SmartJPG, our mission to provide top-notch image compression, conversion, and background removal tools tailored to your needs."
        />
      </Helmet>
      <Main page="png" />

      <Description />
    </div>
  );
};

export default Png;
