'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IoMdAdd } from 'react-icons/io';
import { addNewBranch } from '@/actions/actions';

export default function AddBranchCard() {
  const router = useRouter();
  const [openingTime, setOpeningTime] = useState<string>('');
  const [closeTime, setCloseTime] = useState<string>('');

  const handleOpeningTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpeningTime(event.target.value);
  };

  const handleCloseTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCloseTime(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await addNewBranch({
      name: (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value,
      location: (e.currentTarget.elements.namedItem('location') as HTMLInputElement).value,
      opening_time: openingTime,
      closing_time: closeTime,
    });

    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center border border-green-300 bg-white hover:bg-green-500 text-black hover:text-white rounded px-3 py-2">
        <IoMdAdd />
        <p>Add New Branch</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Branch</DialogTitle>
          <DialogDescription>
            <hr className="mt-3 mb-5" />
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Branch Name
                </Label>
                <Input type="text" id="name" name="name" placeholder="Enter Branch Name" required />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="location" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Branch Location
                </Label>
                <Input type="text" id="location" name="location" placeholder="Enter Branch Location" required />
              </div>
              <div className="flex gap-5">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="openingTime" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                    Opening Time
                  </Label>
                  <div className="flex justify-center items-center">
                    <Input required type="time" id="openingTime" name="openingTime" placeholder="Example: 08:00" onChange={handleOpeningTimeChange} value={openingTime} />
                  </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="closingTime" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                    Closing Time
                  </Label>
                  <div className="flex justify-center items-center">
                    <Input required type="time" id="closingTime" name="closingTime" placeholder="Example: 08:00" onChange={handleCloseTimeChange} value={closeTime} />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Add Branch
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
