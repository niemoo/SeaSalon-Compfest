'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IoMdAdd } from 'react-icons/io';
import { addNewService } from '@/actions/actions';

export default function AddServiceCard() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await addNewService({
      name: (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value,
      durations: Number((e.currentTarget.elements.namedItem('durations') as HTMLInputElement).value),
    });

    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center border border-yellow-300 bg-white hover:bg-yellow-500 text-black hover:text-white rounded px-3 py-2">
        <IoMdAdd />
        <p>Add New Service</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>
            <hr className="mt-3 mb-5" />
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Service Name
                </Label>
                <Input type="text" id="name" name="name" placeholder="Enter Service Name" required />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="durations" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Durations
                </Label>
                <Input type="number" id="durations" name="durations" placeholder="Enter durations in minute" required />
              </div>

              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Add Service
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
