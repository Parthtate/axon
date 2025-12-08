// src/hooks/useColorExtractor.js
import { useState, useEffect } from "react";

/**
 * Extract dominant color from image for dynamic gradient
 * Requirement #5: Background gradient based on cover image
 */
export const useColorExtractor = (imageUrl) => {
  const [colors, setColors] = useState({
    primary: "#667eea",
    secondary: "#764ba2",
  });

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Get image data from center area
        const imageData = ctx.getImageData(
          img.width / 4,
          img.height / 4,
          img.width / 2,
          img.height / 2
        );

        const data = imageData.data;
        let r = 0,
          g = 0,
          b = 0;
        const pixelCount = data.length / 4;

        // Calculate average color
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }

        r = Math.floor(r / pixelCount);
        g = Math.floor(g / pixelCount);
        b = Math.floor(b / pixelCount);

        // Create gradient colors
        const primary = `rgb(${r}, ${g}, ${b})`;
        const secondary = `rgb(${Math.floor(r * 0.7)}, ${Math.floor(
          g * 0.7
        )}, ${Math.floor(b * 0.7)})`;

        setColors({ primary, secondary });
      } catch (error) {
        console.error("Error extracting colors:", error);
      }
    };

    img.onerror = () => {
      console.error("Error loading image for color extraction");
    };
  }, [imageUrl]);

  return colors;
};

export default useColorExtractor;
