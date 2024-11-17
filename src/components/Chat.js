import React from "react";
import Main from "./Main";
import { Helmet } from "react-helmet";

const Chat = () => {
  return (
    <div className="Chat">
      <Helmet>
        <title>AI Chatbot - SmartJPG</title>
        <meta
          name="description"
          content="Learn more about SmartJPG, our mission to provide top-notch image compression, conversion, and background removal tools tailored to your needs."
        />
      </Helmet>
      <Main page="chat" />
    </div>
  );
};

export default Chat;
