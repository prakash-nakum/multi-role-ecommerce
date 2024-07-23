// components/ImageDisplay.js
import Image from "next/image";
import React from "react";

const ImageDisplay = ({ imageData }) => {
  if (!imageData) {
    return null;
  }

  const { data, contentType } = imageData.image;

  const base64Image = Buffer.from(data).toString("base64");
  const imageUrl = `data:${contentType};base64,${base64Image}`;

  return (
    <div>
      <h2>{imageData.name}</h2>
      <Image width={100} height={50} src={imageUrl} alt={imageData.name} />
    </div>
  );
};

export default ImageDisplay;
