import React from "react";
import Main from "./Main";
import { Helmet } from "react-helmet";
import Description from "./Description";

const JPG = () => {
  return (
    <div className="JPG">
      <Helmet>
        <title>Convert to JPG | SmartJPG</title>
        <link rel="canonical" href="https://www.smartjpg.app/jpg" />
        <meta
          name="description"
          content="Learn more about SmartJPG, our mission to provide top-notch image compression, conversion, and background removal tools tailored to your needs."
        />
      </Helmet>
      <Main page="jpg" />

      <Description />
    </div>
  );
};

export default JPG;
