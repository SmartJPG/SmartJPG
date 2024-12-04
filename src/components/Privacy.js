import React from "react";
import Helmet from "react-helmet";

const Privacy = () => {
  return (
    <div style={{ padding: "10px" }}>
      <Helmet>
        <title>Privacy Policy - SmartJPG</title>
        <link rel="canonical" href="https://www.smartjpg.app/privacy" />
        <meta name="description" content="SmartJPG Privacy Policy" />
      </Helmet>
      <div className="Privacy">
        <h1>Privacy Policy</h1>
        <br />
        <br />
        <h2>Introduction</h2>
        <p>
          Welcome to SmartJPG! At SmartJPG, we prioritize your privacy and are
          committed to ensuring the protection of your personal information.
          This privacy policy outlines how we manage, process, and protect the
          data and files that may interact with our service.
        </p>
        <br />
        <h2>Applicability of This Privacy Policy</h2>
        <p>
          This Privacy Policy applies to all users of the SmartJPG website and
          related services. By using our service, you agree to the practices
          described in this Privacy Policy.
        </p>
        <br />
        <h2>Personal Information We Collect</h2>
        <p>
          Currently, we do not collect any personal information from users. As
          we do not have a database in place, there is no collection or storage
          of user data.
        </p>
        <br />
        <h2>Personal Information We Do Not Collect</h2>
        <p>
          SmartJPG does not request or store any personally identifiable
          information, including but not limited to names, email addresses, IP
          addresses, or payment information. No user data is retained or tracked
          during your interaction with our service.
        </p>
        <br />
        <h2>File Protection and Security</h2>
        <p>
          SmartJPG utilizes an isolated environment to process your uploaded
          files securely. This ensures that files are temporarily handled and
          protected against unauthorized access or leaks. Uploaded files are not
          stored beyond the scope of the processing activity and are
          automatically deleted upon completion.
        </p>
        <br />
        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy periodically to reflect changes in
          our practices, technology, or legal requirements. Any updates to this
          policy will be posted on this page, and the effective date will be
          updated accordingly.
        </p>
        <br />
        <h2>Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please reach out to us at leohoncanada@gmail.com.
        </p>

        <button className="back" onClick={() => (window.location.href = "/")}>
          {" "}
          Go back{" "}
        </button>
      </div>
    </div>
  );
};

export default Privacy;
