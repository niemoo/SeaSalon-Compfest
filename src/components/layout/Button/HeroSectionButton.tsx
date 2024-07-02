'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MdArrowRightAlt } from 'react-icons/md';

export default function HeroButtonSection() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

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
    <>
      <Link href={isLogin ? '/dashboard' : '/login'} className="flex items-center text-lg font-semibold text-white underline hover:text-stone-800 rounded-lg">
        <MdArrowRightAlt />
        <span>Make a Reservation</span>
      </Link>
    </>
  );
}
