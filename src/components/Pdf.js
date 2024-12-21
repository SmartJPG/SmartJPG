import React from "react";
import Main from "./Main";
import { Helmet } from "react-helmet";
import Description from "./Description";
import Header from "./Header";
import Footer from "./Footer";

const Pdf = () => {
  return (
    <div className="PDF">
      <Header />
      <Helmet>
        <title>Merge PDFs - Fast and Easy PDF Creation | SmartJPG</title>
        <link rel="canonical" href="https://www.smartjpg.app/pdf" />
        <meta
          name="description"
          content="Learn more about SmartJPG, our mission to provide top-notch image compression, conversion, and background removal tools tailored to your needs."
        />
      </Helmet>
      <Main page="pdf" />

      <Description />

      <Footer />
    </div>
  );
};

export default Pdf;
