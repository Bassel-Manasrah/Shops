import React from "react";

export default function ImageDropV2({ url, update }) {
  return (
    <>
      <div
        className={`${styles.dropZone} ${isBig ? styles.big : ""}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        {<img src={imageUrl}></img>}
      </div>
    </>
  );
}
