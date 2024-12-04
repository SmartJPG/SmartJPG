import React from "react";
import Main from "./Main";
import { Helmet } from "react-helmet";
import Description from "./Description";

const RemoveBg = () => {
  return (
    <div className="RM">
      <Helmet>
        <title>
          Remove Background from Images - Quick and Easy Tool | SmartJPG
        </title>
        <link rel="canonical" href="https://www.smartjpg.app/remove-bg" />
        <meta
          name="description"
          content="Learn more about SmartJPG, our mission to provide top-notch image compression, conversion, and background removal tools tailored to your needs."
        />
      </Helmet>
      <Main page="RM" />

      <Description />
    </div>
  );
};

export default RemoveBg;
