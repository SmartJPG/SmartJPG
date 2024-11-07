import React from "react";
import Main from "./Main";
import { Helmet } from "react-helmet";

const Png = () => {
  return (
    <div>
      <Helmet>
        <title>
          Convert images to PNG - High-Quality Image Conversion | SmartJPG
        </title>
        <meta
          name="description"
          content="Learn more about SmartJPG, our mission to provide top-notch image compression, conversion, and background removal tools tailored to your needs."
        />
      </Helmet>
      <Main page="png" />
    </div>
  );
};

export default Png;
