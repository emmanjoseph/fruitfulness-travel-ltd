"use client";

import { useEffect, useState } from "react";
import { fetchPexelsImages } from "@/lib/pexels";
import PhotoCarousel from "@/components/ui/photo-carousel";

const PexelsGallery = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const loadPhotos = async () => {
      // Use the existing utility to fetch images
      const photos = await fetchPexelsImages("safari landscape wildlife", 10);
      setImages(photos.map((p: any) => p.src.large2x));
    };
    loadPhotos();
  }, []);

  if (images.length === 0) return null;

  return <PhotoCarousel slides={images.map(url => ({ src: url, alt: "Safari Image" }))} />;
};

export default PexelsGallery;
