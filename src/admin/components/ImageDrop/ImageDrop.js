import { useState } from "react";
import styles from "./imageDrop.module.css";

function DragAndDrop({ imageStartUrl, onChange }) {
  const [isBig, setBig] = useState(false);

  function handleDragOver(event) {
    event.preventDefault();
    setBig(true);
  }

  function handleDragLeave(event) {
    setBig(false);
  }

  function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const fileUrl = URL.createObjectURL(file);
    setBig(false);

    onChange(file);
  }

  return (
    <>
      <div
        className={`${styles.dropZone} ${isBig ? styles.big : ""}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        {<img src={imageStartUrl}></img>}
      </div>
    </>
  );
}

export default DragAndDrop;
