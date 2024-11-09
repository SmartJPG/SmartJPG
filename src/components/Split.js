import React from "react";
import Main from "./Main";
import { Helmet } from "react-helmet";

const Split = () => {
  return (
    <div>
      <Helmet>
        <title>Split PDFs - High-Quality PDF Splitting | SmartJPG</title>
        <meta
          name="description"
          content="Learn more about SmartJPG, our mission to provide top-notch image compression, conversion, and background removal tools tailored to your needs."
        />
      </Helmet>
      <Main page="split" />
    </div>
  );
};

export default Split;
