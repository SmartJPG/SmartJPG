import React from "react";
import Main from "./Main";
import { Helmet } from "react-helmet";

const Smartify = () => {
  return (
    <div className="Smartify">
      <Helmet>
        <title>Smartify | SmartJPG</title>
        <link rel="canonical" href="https://www.smartjpg.app/smartify" />
        <meta
          name="description"
          content="Learn more about Smartify, our mission to provide top-notch image compression, conversion, and background removal tools tailored to your needs."
        />
      </Helmet>
      <Main page="smartify" />
    </div>
  );
};

export default Smartify;
