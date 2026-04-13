"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  '/facility/1.jpeg',
  '/facility/facility-2.jpeg',
  '/facility/3.jpeg',
  '/facility/4.jpeg',
  '/facility/6.jpeg',
  '/facility/7.jpeg',
  '/facility/8.jpeg',
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Change image every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Images container */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <Image
            src={src}
            alt={`Facility photo ${index + 1}`}
            fill
            priority={index === 0}
            style={{ objectFit: 'cover' }}
            sizes="100vw"
            quality={90}
          />
        </div>
      ))}

      {/* Elegant dark overlay directly over images so content stands out */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent pointer-events-none md:bg-gradient-to-r md:from-white/80 md:via-white/50 md:to-white/20"></div>
    </div>
  );
}
