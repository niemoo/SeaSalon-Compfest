'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { registerUser } from '@/actions/actions';

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string | null>();

  const handlePhoneNumberInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
  };

  const handlePasswordInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 8) {
      e.currentTarget.value = e.currentTarget.value.slice(0, 8);
    }
  };

  const handleNameInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 50) {
      e.currentTarget.value = e.currentTarget.value.slice(0, 50);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await registerUser(formData);

    if (response.success) {
      router.push('/login');
    } else {
      setMessage(response.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="md:w-1/2 w-full mx-auto grid gap-5 p-5 mt-20 border border-gray-500 shadow-xl rounded-lg">
        <h3 className="text-xl font-semibold">Account Register</h3>
        <hr className="" />
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="full_name" className="after:content-['*'] after:ml-0.5 after:text-red-500">
            Nama Lengkap
          </Label>
          <Input required type="text" id="full_name" name="full_name" placeholder="Enter Your Full Name" onInput={handleNameInput} />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-red-500">
            Email
          </Label>
          <Input required type="text" id="email" name="email" placeholder="Enter Your Email" />
          {message && <div className="text-red-500 text-sm mb-4">{message}</div>}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password" className="after:content-['*'] after:ml-0.5 after:text-red-500">
            Password
          </Label>
          <div className="flex gap-3">
            <Input required type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder="Enter Your Password" onInput={handlePasswordInput} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="p-2 border border-gray-200 rounded-lg">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <p className="text-sm text-gray-500">Password maksimal 8 karakter.</p>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="phone_number" className="after:content-['*'] after:ml-0.5 after:text-red-500">
            No. Telp
          </Label>
          <Input required type="text" id="phone_number" name="phone_number" placeholder="Enter Your Phone Number" onInput={handlePhoneNumberInput} />
        </div>

        <div className="w-full flex justify-end">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
