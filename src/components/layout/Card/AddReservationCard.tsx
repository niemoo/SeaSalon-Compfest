'use client';

import { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getBranchesWithServicesApp, createNewReservation } from '@/actions/actions';

interface User {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
}

interface Branches {
  id: number;
  name: string;
  location: string;
  services: { id: number; name: string }[];
  opening_time: string;
  closing_time: string;
}

export default function AddReservationCard() {
  const [branches, setBranches] = useState<Branches[] | undefined>([]);
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchBranches = async () => {
      const response = await getBranchesWithServicesApp();
      if (response.success) {
        console.log(response.data);
        setBranches(response.data);
      } else {
        console.error(response.message);
      }
    };

    fetchBranches();
  }, []);

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    setDate(selectedDate);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!date || !time || !selectedService || !user || !selectedBranch) {
      console.log('All fields are required');
      return;
    }

    const userId = user.id;
    const serviceId = parseInt(selectedService);
    const branchId = selectedBranch;

    const result = await createNewReservation({
      name: (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value,
      phone_number: (e.currentTarget.elements.namedItem('phone_number') as HTMLInputElement).value,
      date,
      time,
      userId,
      serviceId,
      branchId,
    });

    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  useEffect(() => {
    const updateUser = () => {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    updateUser();

    window.addEventListener('storage', updateUser);

    return () => {
      window.removeEventListener('storage', updateUser);
    };
  }, []);

  return (
    <Dialog>
      <DialogTrigger className="flex items-center border border-green-300 bg-white hover:bg-green-500 text-black hover:text-white rounded px-3 py-2">
        <IoMdAdd />
        <p>Add New Reservation</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add New Reservation
            <hr className="my-5" />
          </DialogTitle>

          <form className="rounded-lg grid gap-5" onSubmit={handleSubmit}>
            <div className="grid  items-center gap-1.5">
              <Label htmlFor="name" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                Name
              </Label>
              <Input required type="text" id="name" name="name" placeholder="Enter Your Name" />
            </div>
            <div className="grid  items-center gap-1.5">
              <Label htmlFor="phone_number" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                Phone Number
              </Label>
              <Input required type="text" id="phone_number" name="phone_number" placeholder="Enter Your Phone Number" />
            </div>
            <div className="grid  items-center gap-1.5">
              <Label htmlFor="branch" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                Branch
              </Label>
              <Select onValueChange={(value) => setSelectedBranch(parseInt(value))} required name="branch">
                <SelectTrigger className="">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Branches</SelectLabel>
                    {branches?.map((branch) => (
                      <SelectItem key={branch?.id} value={branch?.id.toString()}>
                        {branch?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid  items-center gap-1.5">
              <Label htmlFor="service" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                Service Type
              </Label>
              <Select onValueChange={(value) => setSelectedService(value)} required name="service">
                <SelectTrigger className="">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Services</SelectLabel>
                    {selectedBranch &&
                      branches
                        ?.find((branch) => branch.id === selectedBranch)
                        ?.services.map((service) => (
                          <SelectItem key={service?.id} value={service?.id.toString()}>
                            {service?.name}
                          </SelectItem>
                        ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-5">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="date" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Date
                </Label>
                <input type="date" id="date" name="date" onChange={handleDateChange} className="border border-gray-200 rounded-lg px-3 py-1" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="time" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Start Time
                </Label>
                <div className="flex justify-center items-center">
                  <Input required type="time" id="time" name="time" placeholder="Example: 08:00" onChange={handleTimeChange} value={time} />
                </div>
              </div>
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Reserve
            </button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
