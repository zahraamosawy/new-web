import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import imageCompression from "browser-image-compression";
import "./ImageUpload.css";

const ImageUpload = ({ onImagesChange }) => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setLoading(true);

    try {
      // خيارات ضغط الصور
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      };

      const compressedImages = await Promise.all(
        files.map(async (file) => {
          try {
            const compressedFile = await imageCompression(file, options);
            return {
              file: compressedFile,
              preview: URL.createObjectURL(compressedFile),
              originalName: file.name,
            };
          } catch (error) {
            console.error("Error compressing image:", error);
            return {
              file,
              preview: URL.createObjectURL(file),
              originalName: file.name,
            };
          }
        })
      );

      const newImages = [...images, ...compressedImages];
      setImages(newImages);
      setPreviews(newImages.map((img) => img.preview));

      // إعلام المكون الأصل بالتغيير
      if (onImagesChange) {
        onImagesChange(newImages);
      }
    } catch (error) {
      console.error("Error processing images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newImages.map((img) => img.preview));

    // إعلام المكون الأصل بالتغيير
    if (onImagesChange) {
      onImagesChange(newImages);
    }
  };

  return (
    <div className="image-upload">
      <div className="upload-area">
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          disabled={loading}
        />
        <label htmlFor="image-upload" className="upload-label">
          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            <>
              <div className="upload-icon">+</div>
              <span>{t("dashboard.uploadImages")}</span>
            </>
          )}
        </label>
      </div>

      {previews.length > 0 && (
        <div className="image-preview-container">
          {previews.map((preview, index) => (
            <div className="image-preview" key={index}>
              <img src={preview} alt={`Preview ${index + 1}`} />
              <button
                type="button"
                className="remove-image"
                onClick={() => handleRemoveImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
