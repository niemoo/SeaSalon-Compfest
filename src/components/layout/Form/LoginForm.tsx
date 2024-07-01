'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginAuth } from '@/actions/actions';

export default function LoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await loginAuth(formData);

    if (response.success) {
      if (response.role == 1) {
        sessionStorage.setItem('admin', JSON.stringify(response.admin));
        sessionStorage.setItem('role', JSON.stringify(response.role));
        sessionStorage.setItem('isLogin', 'true');
        window.dispatchEvent(new Event('storage'));
        router.push('/dashboard');
      } else if (response.role == 2) {
        sessionStorage.setItem('user', JSON.stringify(response.user));
        sessionStorage.setItem('role', JSON.stringify(response.role));
        sessionStorage.setItem('isLogin', 'true');
        window.dispatchEvent(new Event('storage'));
        router.push('/');
      }
    } else {
      setMessage(response.message); // Set the error message
    }
  };

  return (
    <>
      <form className="md:w-1/2 grid gap-5 mx-auto mt-20 bg-white p-5 rounded-lg shadow-xl border border-gray-500" onSubmit={handleLogin}>
        <h3 className="text-xl font-semibold">Login</h3>
        <hr className="" />
        {message && <div className="text-red-500 text-sm mb-4">{message}</div>}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input required type="email" id="email" name="email" placeholder="Enter Your Email" />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input required type="password" id="password" name="password" placeholder="Enter Your Password" />
        </div>
        <div className="w-full flex justify-end">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded">
            Masuk
          </button>
        </div>
      </form>
    </>
  );
}
