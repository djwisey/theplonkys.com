'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Lightbox } from './Lightbox';

interface GalleryProps {
  images: { src: string; alt: string }[];
}

export function Gallery({ images }: GalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, idx) => (
          <button
            key={image.src}
            className="group relative overflow-hidden rounded-xl border border-white/5"
            onClick={() => setActive(idx)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={400}
              className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="absolute left-3 bottom-3 text-sm text-white">{image.alt}</span>
          </button>
        ))}
      </div>
      {active !== null && <Lightbox image={images[active]} onClose={() => setActive(null)} />}
    </div>
  );
}
