import React, { useState } from "react";
import imageCompression from "browser-image-compression";

export default function ImageUpload() {
  const [compressedImage, setCompressedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const options = {
      maxSizeMB: 1, // أقصى حجم بعد الضغط
      maxWidthOrHeight: 1280, // أقصى عرض أو ارتفاع
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);

      setCompressedImage(compressedFile);
      setPreview(URL.createObjectURL(compressedFile));

    } catch (error) {
      console.error("Compression error:", error);
    }
  };

  const handleUpload = async () => {
    if (!compressedImage) return;

    const formData = new FormData();
    formData.append("image", compressedImage);

    try {
      const response = await fetch("https://yourdomain.com/upload.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result);

    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {preview && (
        <div>
          <img src={preview} alt="Preview" width="300" />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
}