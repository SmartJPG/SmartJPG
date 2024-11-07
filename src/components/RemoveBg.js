import React from "react";
import Main from "./Main";
import { Helmet } from "react-helmet";

const RemoveBg = () => {
  return (
    <div>
      <Helmet>
        <title>
          Remove Background from Images - Quick and Easy Tool | SmartJPG
        </title>
        <meta
          name="description"
          content="Learn more about SmartJPG, our mission to provide top-notch image compression, conversion, and background removal tools tailored to your needs."
        />
      </Helmet>
      <Main page="RM" />
    </div>
  );
};

export default RemoveBg;
