'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';
import { GiHairStrands } from 'react-icons/gi';

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Navbar() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>('');
  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    const updateIsLogin = () => {
      const storedIsLogin = sessionStorage.getItem('isLogin');
      setIsLogin(storedIsLogin ? JSON.parse(storedIsLogin) : false);
    };

    const updateIsAdmin = () => {
      const storedIsAdmin = sessionStorage.getItem('role');
      if (storedIsAdmin) {
        const checkIsAdmin = JSON.parse(storedIsAdmin);
        setIsAdmin(checkIsAdmin === 1);
      } else {
        setIsAdmin(false);
      }
    };

    const updateUser = () => {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        const userSession = JSON.parse(storedUser);
        setUserName(userSession.full_name ?? '');
      }
    };

    updateIsLogin();
    updateIsAdmin();
    updateUser();

    window.addEventListener('storage', updateIsLogin);
    window.addEventListener('storage', updateIsAdmin);
    window.addEventListener('storage', updateUser);

    return () => {
      window.removeEventListener('storage', updateIsLogin);
      window.removeEventListener('storage', updateIsAdmin);
      window.removeEventListener('storage', updateUser);
    };
  }, [isAdmin]);

  const handleHomeClick = () => {
    scrollToSection('home');
  };

  const handleServiceClick = () => {
    scrollToSection('service');
  };

  const handleReviewsClick = () => {
    scrollToSection('reviews');
  };

  const handleContactClick = () => {
    scrollToSection('contacts');
  };

  const handleLogout = () => {
    sessionStorage.setItem('isLogin', 'false');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('admin');
    setIsLogin(false);
    setIsAdmin(false);
    router.push('/');
  };

  return (
    <>
      {isAdmin ? (
        <nav className="fixed top-0 left-0 right-0 z-10 bg-white px-3">
          <div className="flex items-center border-b-2 border-gray-200 p-4">
            <div className="flex items-center gap-1">
              <GiHairStrands className="text-xl" />
              <h2 className="text-xl font-bold text-stone-700">
                <span className="text-cyan-800">Sea</span>Salon
              </h2>
            </div>
            <h2 className="text-xl font-semibold px-4 ml-5 border-l-2 border-gray-200">Dashboard</h2>
            <ul className="flex items-center ml-auto space-x-4">
              <li>
                <button className="px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded-lg transition duration-300 ease-in-out" onClick={handleLogout}>
                  <FiLogOut />
                </button>
              </li>
            </ul>
          </div>
        </nav>
      ) : isLogin ? (
        <nav className="fixed top-0 left-0 right-0 z-10 bg-white px-3">
          <div className="flex items-center border-b-2 border-gray-200 p-4">
            <div className="flex items-center gap-1">
              <GiHairStrands className="text-xl" />
              <h2 className="text-xl font-bold text-stone-700">
                <span className="text-cyan-800">Sea</span>Salon
              </h2>
            </div>
            <h2 className="text-xl font-semibold px-4 ml-5 border-l-2 border-gray-200">{`${userName}`}'s Dashboard</h2>
            <ul className="flex items-center ml-auto space-x-4">
              <li>
                <button className="px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded-lg transition duration-300 ease-in-out" onClick={handleLogout}>
                  <FiLogOut />
                </button>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        <nav className="fixed top-0 left-0 right-0 bg-stone-400 shadow-md z-10 px-3">
          <div className="max-w-screen-xl mx-auto py-5 flex justify-between items-center">
            <div className="flex items-center gap-1">
              <GiHairStrands className="text-xl" />
              <h2 className="text-xl font-bold text-stone-700">
                <span className="text-cyan-800">Sea</span>Salon
              </h2>
            </div>
            <ul className="list-none items-center gap-10 md:flex hidden">
              <li>
                <button onClick={handleHomeClick} className="py-1 px-3 rounded text-slate-100 hover:bg-stone-800">
                  Home
                </button>
              </li>
              <li>
                <button onClick={handleServiceClick} className="py-1 px-3 rounded text-slate-100 hover:bg-stone-800">
                  Service
                </button>
              </li>
              <li>
                <button onClick={handleReviewsClick} className="py-1 px-3 rounded text-slate-100 hover:bg-stone-800">
                  Review
                </button>
              </li>
              <li>
                <button onClick={handleContactClick} className="py-1 px-3 rounded text-slate-100 hover:bg-stone-800">
                  Contact
                </button>
              </li>
            </ul>
            <ul className="flex gap-1">
              <li>
                <Link href="/login" className="py-2 px-3 rounded text-slate-100  hover:bg-stone-800">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="py-2 px-3 rounded text-slate-100 hover:bg-stone-800">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}
