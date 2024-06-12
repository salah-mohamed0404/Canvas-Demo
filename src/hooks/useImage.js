import { useEffect, useRef, useState } from "react";

export default function useImage(imagePath) {
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  useEffect(() => {
    const img = new window.Image();
    img.src = imagePath;
    img.onload = () => {
      setImage(img);
    };
  }, [imagePath]);

  return { image, imageRef };
}
