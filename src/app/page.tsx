'use client';

import { useState } from 'react';
import Salon1 from '../../public/salon1.jpg';

export default function Home() {
  const [rating, setRating] = useState<number>(0);

  // Fungsi untuk menangani klik pada bintang
  const handleClick = (n: number) => {
    setRating(n);
  };

  // Menentukan kelas untuk setiap bintang berdasarkan rating
  const getStarClass = (index: number) => {
    if (index < rating) {
      // Bintang dipilih
      switch (index + 1) {
        case 1:
          return 'text-red-500';
        case 2:
          return 'text-orange-500';
        case 3:
          return 'text-yellow-300';
        case 4:
          return 'text-yellow-500';
        case 5:
          return 'text-green-600';
        default:
          return 'text-gray-300';
      }
    }
    return 'text-gray-300'; // Bintang tidak dipilih
  };
  return (
    <main>
      <section id="home" className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Salon1.src})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex items-center justify-center h-full">
          <h1 className="text-white text-4xl md:text-6xl font-bold z-10">Beauty and Elegance Redefined</h1>
        </div>
      </section>
      <section id="service" className="h-screen flex items-center justify-center bg-gray-200">
        <h2 className="text-2xl font-semibold">Our Services</h2>
      </section>
      <section>
        <div className="max-w-lg bg-white mx-4 p-4 shadow-lg rounded-lg text-center">
          <h1 className="text-xl font-bold mb-4">Review</h1>
          <div className="flex justify-center space-x-1 mb-4">
            {[0, 1, 2, 3, 4].map((index) => (
              <span key={index} onClick={() => handleClick(index + 1)} className={`text-8xl cursor-pointer ${getStarClass(index)}`}>
                ★
              </span>
            ))}
          </div>
          <h3 className="text-lg">Rating is: {rating}/5</h3>
        </div>
      </section>
    </main>
  );
}
