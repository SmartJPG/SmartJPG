import React from "react";
import { useLocation } from "react-router-dom";

// Step and description mapping for each route
const contentMapping = {
  "/": {
    steps: [
      {
        id: 1,
        icon: "/checked.png",
        title: "Upload an Image",
        description:
          "Accept most of the image extensions: HEIC, JPEG, WEBP, AVIF, SVG",
      },
      {
        id: 2,
        icon: "/checked.png",
        title: "Click Convert",
        description: "Convert your image to a different format.",
      },
      {
        id: 3,
        icon: "/checked.png",
        title: "Download Automatically",
        description: "Just simple and easy to use.",
      },
    ],
    description: {
      title: "Why we need to convert to JPG format?",
      content: `JPG is a common image format that is used to store and share images on the internet. 
      It is a lossy format, which means that some image quality is lost when the image is compressed and saved 
      in the JPG format. However, the loss of quality is usually not noticeable to the human eye, making JPG a popular 
      choice for sharing images online.`,
    },
    process: {
      title: "How we process the image?",
      content: `We use a powerful image processing algorithm to convert your image to JPG format. 
      Our algorithm is designed to preserve the quality of the original image while reducing the file size. 
      This allows you to share your images online without sacrificing image quality.`,
    },
    whyChooseUs: {
      title: "Why choose us?",
      content: `We are committed to providing our users with the best image conversion service. 
      Our website is fast, easy to use, and free. We do not require you to sign up or provide any personal 
      information to use our service. Simply upload your image, click convert, and download the JPG file. 
      It's that easy!`,
    },
  },
  "/png": {
    steps: [
      {
        id: 1,
        icon: "/checked.png",
        title: "Upload Your PNG Image",
        description: "Upload the PNG image you want to convert.",
      },
      {
        id: 2,
        icon: "/checked.png",
        title: "Convert PNG",
        description: "Convert your PNG image to JPG or other formats easily.",
      },
      {
        id: 3,
        icon: "/checked.png",
        title: "Download Your Image",
        description: "Download your converted image in the desired format.",
      },
    ],
    description: {
      title: "Why convert PNG images?",
      content: `PNG is a widely used image format that supports lossless compression. Converting it to other formats can reduce size or improve compatibility.`,
    },
    process: {
      title: "How we process PNG images?",
      content: `Our tool uses efficient algorithms to convert PNG images while maintaining transparency and quality.`,
    },
    whyChooseUs: {
      title: "Why choose us?",
      content: `High-quality conversions, fast processing, and no hidden fees.`,
    },
  },
  "/pdf": {
    steps: [
      {
        id: 1,
        icon: "/checked.png",
        title: "Upload PDF Files",
        description: "Easily upload multiple PDF files.",
      },
      {
        id: 2,
        icon: "/checked.png",
        title: "Merge PDF Files",
        description: "Combine multiple PDF documents into one.",
      },
      {
        id: 3,
        icon: "/checked.png",
        title: "Download Merged PDF",
        description: "Get the merged PDF with a single click.",
      },
    ],
    description: {
      title: "Why merge PDF files?",
      content: `Merging PDFs helps in organizing and consolidating related information into a single document.`,
    },
    process: {
      title: "How we merge PDFs?",
      content: `Our tool uses a fast and secure process to merge PDF files without compromising quality.`,
    },
    whyChooseUs: {
      title: "Why choose us for PDF merging?",
      content: `Our tool is free, fast, and secure. No sign-up required!`,
    },
  },
  "/remove-bg": {
    steps: [
      {
        id: 1,
        icon: "/checked.png",
        title: "Upload Image",
        description: "Upload the image you want to remove the background from.",
      },
      {
        id: 2,
        icon: "/checked.png",
        title: "Remove Background",
        description: "Our tool will remove the background automatically.",
      },
      {
        id: 3,
        icon: "/checked.png",
        title: "Download Edited Image",
        description: "Download the image with the background removed.",
      },
    ],
    description: {
      title: "Why remove background?",
      content: `Removing backgrounds makes images clean, professional, and versatile for use in presentations, marketing, or social media.`,
    },
    process: {
      title: "How we remove backgrounds?",
      content: `Our AI-powered tool detects the subject and removes the background with precision.`,
    },
    whyChooseUs: {
      title: "Why choose us?",
      content: `Accurate results, free of charge, and fast processing.`,
    },
  },
  "/sign-pdf": {
    steps: [
      {
        id: 1,
        icon: "/checked.png",
        title: "Upload Your PDF",
        description: "Upload the PDF document you want to sign.",
      },
      {
        id: 2,
        icon: "/checked.png",
        title: "Add Your Signature",
        description: "Place your signature digitally on the document.",
      },
      {
        id: 3,
        icon: "/checked.png",
        title: "Download Signed PDF",
        description: "Download the signed PDF instantly.",
      },
    ],
    description: {
      title: "Why sign PDFs digitally?",
      content: `Digital signatures are fast, secure, and convenient, making them perfect for contracts, agreements, and official documents.`,
    },
    process: {
      title: "How we enable signing?",
      content: `Our tool lets you upload a PDF, place your signature, and download it securely.`,
    },
    whyChooseUs: {
      title: "Why choose us?",
      content: `Secure, user-friendly, and no need for extra software.`,
    },
  },
};

const Description = () => {
  const location = useLocation();
  const content = contentMapping[location.pathname] || {};

  return (
    <div>
      <div className="Description">
        <div className="row des">
          {content.steps?.map((step) => (
            <div className="step" key={step.id}>
              <img src={step.icon} alt={step.title} />
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="seperate"></div>

      {content.description && (
        <div style={{ width: "60%", textAlign: "center", margin: "auto" }}>
          <h2>{content.description.title}</h2>
          <br />
          <p>{content.description.content}</p>
          <br />
          <br />
          {content.process && (
            <>
              <h2>{content.process.title}</h2>
              <br />
              <p>{content.process.content}</p>
              <br />
              <br />
            </>
          )}
          {content.whyChooseUs && (
            <>
              <h2>{content.whyChooseUs.title}</h2>
              <br />
              <p>{content.whyChooseUs.content}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Description;
