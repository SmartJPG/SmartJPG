import React from "react";
import Helmet from "react-helmet";

const Terms = () => {
  return (
    <div style={{ padding: "10px" }}>
      <Helmet>
        <title>Terms of Service - SmartJPG</title>
        <link rel="canonical" href="https://www.smartjpg.com/terms" />
        <meta name="description" content="SmartJPG Terms of Service" />
      </Helmet>

      <div className="Terms">
        <h1>Terms of Service for SmartJPG</h1>
        <p>Effective Date: November 19, 2024</p>
        <p>
          Welcome to SmartJPG, an online platform offering image conversion and
          PDF merging services. By accessing or using our website, you agree to
          the terms outlined in this Terms of Service ("Terms"). If you do not
          agree to these Terms, you must not use our services.
        </p>
        <br />
        <br />
        <h2>Acceptance of Terms</h2>
        <p>
          By accessing or using SmartJPG, you confirm that you have read,
          understood, and agreed to these Terms of Service. These Terms apply to
          all visitors, users, and others who access the website.
        </p>
        <br />
        <h2>Modifications to the Terms</h2>
        <p>
          SmartJPG reserves the right to update or modify these Terms at any
          time without prior notice. Your continued use of the website after
          changes to the Terms constitutes acceptance of the revised Terms. We
          recommend checking this page periodically for updates.
        </p>
        <br />
        <h2>Services Provided</h2>
        <ul>
          <li>
            <p>
              <strong>Image Conversion:</strong> SmartJPG offers tools to
              convert images between different formats, such as JPG, PNG, and
              WebP.
            </p>
          </li>
          <li>
            <p>
              <strong>Background Removal:</strong> SmartJPG provides a tool for
              removing backgrounds from images to create transparent or custom
              backgrounds.
            </p>
          </li>
          <li>
            <p>
              <strong>PDF Merging:</strong> Our platform allows users to merge
              multiple PDF files into a single document.
            </p>
          </li>
          <li>
            <p>
              <strong>PDF Signing:</strong> SmartJPG offers a tool for signing
              PDF documents digitally.
            </p>
          </li>

          <li>
            <p>
              <strong>AI Image Generation:</strong> SmartJPG provides AI-powered
              image generation tools for creating unique and realistic images.
            </p>
          </li>
        </ul>
        <br />
        <h2>User Responsibilities</h2>
        <p> When using SmartJPG, you agree to:</p>
        <ul>
          <li>
            <p>Use the services only for lawful purposes.</p>
          </li>
          <li>
            <p>
              Not upload content that is illegal, harmful, offensive, or
              violates intellectual property rights.
            </p>
          </li>
          <li>
            <p>
              Not attempt to disrupt the functionality of the website or its
              servers.
            </p>
          </li>
        </ul>

        <p>
          We reserve the right to terminate access to any user violating these
          responsibilities.
        </p>

        <br />
        <h2>Privacy Policy</h2>
        <p>
          By using our services, you consent to the collection and use of
          information as described in our <a href="/privacy">Privacy Policy</a>.
          SmartJPG is committed to protecting your privacy and ensuring data
          security.
        </p>
        <br />

        <h2>Limitation of Liability</h2>
        <p>
          SmartJPG is not liable for any damages arising from the use or
          inability to use the website or its services. This includes, but is
          not limited to, data loss, service interruptions, or system failures.
        </p>
        <br />

        <h2>Disclaimer of Warranties</h2>
        <p>
          SmartJPG services are provided "as-is" without warranties of any kind,
          either express or implied. We do not guarantee the accuracy,
          reliability, or suitability of the services for your purposes.
        </p>
        <br />

        <button className="back" onClick={() => (window.location.href = "/")}>
          {" "}
          Go back{" "}
        </button>
      </div>
    </div>
  );
};

export default Terms;
