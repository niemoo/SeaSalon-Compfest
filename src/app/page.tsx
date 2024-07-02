'use client';

import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Salon1 from '../../public/salon1.jpg';
import { MdArrowRightAlt } from 'react-icons/md';
import { GiHairStrands, GiFingernail } from 'react-icons/gi';
import { MdOutlineFaceRetouchingNatural } from 'react-icons/md';

export default function Home() {
  const [rating, setRating] = useState<number>(0);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handleClick = (n: number) => {
    setRating(n);
  };

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
    return 'text-gray-300';
  };

  useEffect(() => {
    const updateIsLogin = () => {
      const storedIsLogin = sessionStorage.getItem('isLogin');
      setIsLogin(storedIsLogin ? JSON.parse(storedIsLogin) : false);
    };

    updateIsLogin();

    window.addEventListener('storage', updateIsLogin);

    return () => {
      window.removeEventListener('storage', updateIsLogin);
    };
  }, []);

  return (
    <main>
      <Navbar />
      <section id="home" className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Salon1.src})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex items-center h-full max-w-screen-xl mx-auto">
          <div className="md:w-1/2 px-5">
            <h1 className="text-zinc-100 text-4xl md:text-6xl font-bold z-10">
              Beauty and Elegance <span className="text-stone-400">Redefined</span>
            </h1>
            <p className="my-5 text-zinc-100">Beautiful things change the one's emotion in a very positive way, they just act as mood changing catalyst in the mind of person.</p>
            <Link href={isLogin ? '/dashboard' : '/login'} className="flex items-center text-lg font-semibold text-white underline hover:text-stone-800 rounded-lg">
              <MdArrowRightAlt />
              <span>Make a Reservation</span>
            </Link>
          </div>
        </div>
      </section>
      <section id="service" className="flex items-center bg-white p-5 py-10">
        <div className="grid gap-10">
          <div className="w-fit mx-auto">
            <h2 className="text-2xl font-semibold text-center">Our Services</h2>
            <hr />
          </div>
          <div className="md:flex grid gap-5 justify-between items-center md:w-1/2 mx-auto">
            <div className="md:w-1/3 w-full border border-blue-300 rounded shadow-md p-5">
              <GiHairStrands className="text-5xl text-blue-600" />
              <h3 className="text-lg font-semibold my-5 text-blue-600">Haircuts and Styling</h3>
              <p className="text-sm text-zinc-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="md:w-1/3 w-full border border-green-300 rounded shadow-md p-5">
              <GiFingernail className="text-5xl text-green-600" />
              <h3 className="text-lg font-semibold my-5 text-green-600">Manicure and Pedicure</h3>
              <p className="text-sm text-zinc-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="md:w-1/3 w-full border border-yellow-300 rounded shadow-md p-5">
              <MdOutlineFaceRetouchingNatural className="text-5xl text-yellow-600" />
              <h3 className="text-lg font-semibold my-5 text-yellow-600">Facial Treatments</h3>
              <p className="text-sm text-zinc-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
      </section>
      {/* <section>
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
      </section> */}
    </main>
  );
}
