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
      content: `PNG images are widely known for their lossless compression and ability to maintain transparency, making them ideal for web graphics and logos. However, PNG files can be larger in size, which can slow down web pages and limit compatibility with certain platforms. Converting PNG to other formats like JPG helps reduce file size significantly, making images faster to load and more shareable. It's a practical solution for creating lightweight assets for websites, emails, and social media.`,
    },
    process: {
      title: "How we process PNG images?",
      content: `We employ advanced conversion methods to transform PNG files into formats like JPG or WebP while preserving their essential qualities, including transparency. Our algorithms ensure minimal loss of detail while achieving a much smaller file size, making the converted images ideal for faster performance and improved accessibility across devices.`,
    },
    whyChooseUs: {
      title: "Why choose us?",
      content: `With our service, you get premium-quality conversions without the premium price tag. Our tools work fast, efficiently, and securely, ensuring that your files are processed without compromise. Best of all, there are no watermarks, no sign-ups, and no delays. Just high-quality output in seconds.`,
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
      content: `DF merging allows you to combine multiple documents into one for improved organization and ease of sharing. Whether you’re compiling receipts, contracts, or multi-page reports, merging PDFs creates a single cohesive document that's easier to store and review. It's a practical solution for professionals and students who need to present their data efficiently.`,
    },
    process: {
      title: "How we merge PDFs?",
      content: `Our PDF merging tool uses a secure and efficient process to combine multiple PDFs while maintaining the quality of each page. Simply upload your files, rearrange them if needed, and let our system handle the rest. Within seconds, your files are combined into a single, professional-looking PDF.`,
    },
    whyChooseUs: {
      title: "Why choose us for PDF merging?",
      content: `We value your time and security. Our tool is designed to be fast, intuitive, and free from unnecessary steps. Unlike other services, we don't require sign-ups or extra installations. Whether it's for work, school, or personal use, you can trust us to handle your PDFs with care and deliver excellent results.`,
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
      content: `Removing image backgrounds is essential for creating polished, professional visuals. Clean images without backgrounds can be used in marketing materials, e-commerce listings, presentations, and social media content. It’s especially useful for showcasing products or subjects without distractions, ensuring your focus remains on what truly matters.`,
    },
    process: {
      title: "How we remove backgrounds?",
      content: `We used AI-powered background removal tool identifies the subject of your image and separates it with remarkable precision. Whether it's a person, product, or object, our algorithm ensures crisp edges and smooth transitions, making the final image ready for use. The entire process is automated, fast, and accurate.`,
    },
    whyChooseUs: {
      title: "Why choose us?",
      content: `This background removal tool offers industry-grade precision at no cost. It's quick, simple, and effective for professionals and casual users alike. Forget expensive software or complicated tools—just upload your image, let our AI do the work, and download a stunning result.`,
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
      content: `In today’s fast-paced world, digital signatures are becoming the standard for signing contracts, agreements, and other important documents. Signing PDFs digitally eliminates the need for printing and scanning, saving you time and resources. It’s a secure, legally recognized method to finalize documents with ease, whether you're working from home, in the office, or on the go.`,
    },
    process: {
      title: "How we enable signing?",
      content: `Our tool simplifies the process of signing PDFs. Upload your document, place your signature using our drag-and-drop feature, and download the signed PDF instantly. All signatures are encrypted and embedded securely into the document to ensure their authenticity.`,
    },
    whyChooseUs: {
      title: "Why choose us?",
      content: `Our PDF signing tool combines simplicity and security. With no software downloads or sign-ups required, you can sign your documents quickly and confidently. Whether it's for personal or professional use, our service guarantees a smooth and secure signing experience.`,
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
        <div className="line-background-des">
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
