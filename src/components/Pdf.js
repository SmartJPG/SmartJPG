import React from "react";
import Main from "./Main";
import { Helmet } from "react-helmet";
import Description from "./Description";

const Pdf = () => {
  return (
    <div className="PDF">
      <Helmet>
        <title>Merge PDFs - Fast and Easy PDF Creation | SmartJPG</title>
        <meta
          name="description"
          content="Learn more about SmartJPG, our mission to provide top-notch image compression, conversion, and background removal tools tailored to your needs."
        />
      </Helmet>
      <Main page="pdf" />

      <Description />
    </div>
  );
};

export default Pdf;
