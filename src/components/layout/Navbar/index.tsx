'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LuUserCircle2 } from 'react-icons/lu';
import { FiLogOut } from 'react-icons/fi';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Navbar() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    // Function to get the isLogin state from sessionStorage
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
        setIsAdmin(false); // Default value if isAdmin is not found in sessionStorage
      }
    };

    // Initialize state
    updateIsLogin();
    updateIsAdmin();

    // Add event listener for changes in sessionStorage
    window.addEventListener('storage', updateIsLogin);
    window.addEventListener('storage', updateIsAdmin);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('storage', updateIsLogin);
      window.removeEventListener('storage', updateIsAdmin);
    };
  }, [isAdmin]);

  const handleHomeClick = () => {
    if (currentPath === '/') {
      scrollToSection('home');
    } else {
      router.push('/');
    }
  };

  const handleServiceClick = () => {
    if (currentPath === '/') {
      scrollToSection('service');
    } else {
      router.push('/');
    }
  };

  const handleLogout = () => {
    sessionStorage.setItem('isLogin', 'false');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('admin');
    setIsLogin(false);
    setIsAdmin(false); // Reset isAdmin state on logout
    router.push('/');
  };

  return (
    <>
      {isAdmin ? (
        <nav className="fixed top-0 left-0 right-0 z-10 bg-white">
          <div className="flex items-center border-b-2 border-gray-200 p-4">
            <h2 className="text-xl font-semibold text-center border-r-2 border-gray-200 pr-4">SeaSalon</h2>
            <h2 className="text-xl font-semibold px-4">Dashboard</h2>
            <ul className="flex items-center ml-auto space-x-4">
              <li>
                <button className="px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded-lg transition duration-300 ease-in-out" onClick={handleLogout}>
                  <FiLogOut />
                </button>
              </li>
            </ul>
          </div>
          <hr className="border-gray-200" />
        </nav>
      ) : (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
          <div className="max-w-screen-xl mx-auto py-5 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              SeaSalon
            </Link>
            <ul className="list-none flex items-center gap-10 md:flex hidden">
              <li>
                <button onClick={handleHomeClick} className="py-1 px-3 rounded hover:bg-slate-200">
                  Home
                </button>
              </li>
              <li>
                <button onClick={handleServiceClick} className="py-1 px-3 rounded hover:bg-slate-200">
                  Service
                </button>
              </li>
              {isLogin ? (
                <li>
                  <Popover>
                    <PopoverTrigger>
                      <LuUserCircle2 className="text-2xl" />
                    </PopoverTrigger>
                    <PopoverContent>
                      <button className="px-4 py-2 bg-gray-200 hover:bg-gray-400 hover:text-white rounded-lg" onClick={handleLogout}>
                        Logout
                      </button>
                    </PopoverContent>
                  </Popover>
                </li>
              ) : (
                <>
                  <li>
                    <Link href="/login" className="py-1 px-3 rounded hover:bg-slate-200">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className="py-1 px-3 rounded hover:bg-slate-200">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="md:hidden flex items-center gap-2">
              <Popover>
                <PopoverTrigger>
                  <LuUserCircle2 className="text-2xl" />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  {isLogin ? (
                    <button className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-400 hover:text-white rounded-lg" onClick={handleLogout}>
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link href="/login" className="block py-2 px-4 text-gray-700 hover:bg-slate-200 rounded">
                        Login
                      </Link>
                      <Link href="/register" className="block py-2 px-4 text-gray-700 hover:bg-slate-200 rounded">
                        Register
                      </Link>
                    </>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
