'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface LightboxProps {
  image: { src: string; alt: string };
  onClose: () => void;
}

export function Lightbox({ image, onClose }: LightboxProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" role="dialog" aria-modal="true">
      <button className="absolute right-4 top-4 text-white" onClick={onClose} aria-label="Close lightbox">
        <XMarkIcon className="h-7 w-7" />
      </button>
      <Image src={image.src} alt={image.alt} width={1200} height={800} className="max-h-[80vh] w-auto rounded-xl shadow-2xl" />
    </div>
  );
}
