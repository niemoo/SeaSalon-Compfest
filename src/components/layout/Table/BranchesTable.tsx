'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getBranchesWithServicesDashboard, updateBranch, deleteBranch } from '@/actions/actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Branches {
  id: number;
  name: string;
  location: string;
  services: string[];
  opening_time: string;
  closing_time: string;
}

export default function BranchesTable() {
  const [branches, setBranches] = useState<Branches[] | undefined>([]);
  const [selectedBranch, setSelectedBranch] = useState<Branches | null>(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');

  useEffect(() => {
    const fetchBranches = async () => {
      const response = await getBranchesWithServicesDashboard();
      if (response?.success) {
        setBranches(response?.data);
      } else {
        console.error(response.message);
      }
    };

    fetchBranches();
  }, []);

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await updateBranch({
      id: selectedBranch?.id as number,
      name,
      location,
      opening_time: openingTime,
      closing_time: closingTime,
    });

    if (result.success) {
      toast.success(result.message);
      setBranches((prevBranches) => prevBranches?.map((branch) => (branch.id === selectedBranch?.id ? { ...branch, name, location, opening_time: openingTime, closing_time: closingTime } : branch)));
      setSelectedBranch(null);
    } else {
      toast.error(result.message);
    }
  };

  const onDeleteHandle = async (branchId: number) => {
    const result = await deleteBranch(branchId);

    if (result.success) {
      toast.success(result.message);
      setBranches((prevBranches) => prevBranches?.filter((branch) => branch.id !== branchId));
    } else {
      toast.error(result.message);
    }
  };

  const openUpdateDialog = (branch: Branches) => {
    setSelectedBranch(branch);
    setName(branch.name);
    setLocation(branch.location);
    setOpeningTime(branch.opening_time);
    setClosingTime(branch.closing_time);
  };

  return (
    <Table className="bg-white">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Branch Id</TableHead>
          <TableHead>Branch Name</TableHead>
          <TableHead>Branch Location</TableHead>
          <TableHead>Services</TableHead>
          <TableHead>Opening Time</TableHead>
          <TableHead>Closing Time</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {branches?.map((branch) => (
          <TableRow key={branch?.id}>
            <TableCell className="font-medium">{branch?.id}</TableCell>
            <TableCell>{branch?.name}</TableCell>
            <TableCell>{branch?.location}</TableCell>
            <TableCell>{branch?.services.join(', ')}</TableCell>
            <TableCell>{branch?.opening_time}</TableCell>
            <TableCell>{branch?.closing_time}</TableCell>
            <TableCell className="flex">
              <Dialog>
                <DialogTrigger className="flex items-center border border-green-300 bg-white hover:bg-green-500 text-black hover:text-white rounded px-3 py-2" onClick={() => openUpdateDialog(branch)}>
                  Update
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Branch</DialogTitle>
                    <DialogDescription>
                      <hr className="mt-3 mb-5" />
                      <form onSubmit={handleUpdateSubmit} className="grid gap-5">
                        <div className="grid w-full items-center gap-1.5">
                          <Label htmlFor="name" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                            Branch Name
                          </Label>
                          <Input type="text" id="name" name="name" placeholder="Enter Branch Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                          <Label htmlFor="location" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                            Branch Location
                          </Label>
                          <Input type="text" id="location" name="location" placeholder="Enter Branch Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                        </div>
                        <div className="flex gap-5">
                          <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="openingTime" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                              Opening Time
                            </Label>
                            <div className="flex justify-center items-center">
                              <Input required type="time" id="openingTime" name="openingTime" placeholder="Example: 08:00" value={openingTime} onChange={(e) => setOpeningTime(e.target.value)} />
                            </div>
                          </div>
                          <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="closingTime" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                              Closing Time
                            </Label>
                            <div className="flex justify-center items-center">
                              <Input required type="time" id="closingTime" name="closingTime" placeholder="Example: 08:00" value={closingTime} onChange={(e) => setClosingTime(e.target.value)} />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Update Branch
                          </button>
                        </div>
                      </form>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <button className="ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={() => onDeleteHandle(branch.id)}>
                Delete
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
