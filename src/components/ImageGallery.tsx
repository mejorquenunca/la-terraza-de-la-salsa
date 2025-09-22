import React, { useState, useEffect } from 'react';

// Import the 6 working local images
import img13DeNoviembre from '../assets/13-de-noviembre.jpg';
import imgAlcaldia from '../assets/alcaldia.jpg';
import imgJrLima from '../assets/jr-lima.jpg';
import imgLaPantoja2 from '../assets/la-pantoja2.jpg';
import imgLaTerraza from '../assets/la-terraza.png';
import imgTupac from '../assets/tupac.png';

const ImageGallery = () => {
  // Array with the 6 working images
  const images = [
    img13DeNoviembre,
    imgAlcaldia,
    imgJrLima,
    imgLaPantoja2,
    imgLaTerraza,
    imgTupac,
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Dance gallery ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};

export default ImageGallery;