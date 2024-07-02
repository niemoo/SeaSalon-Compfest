'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getBranchesWithServicesDashboard } from '@/actions/actions';

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

  useEffect(() => {
    const fetchBranches = async () => {
      const response = await getBranchesWithServicesDashboard();
      if (response?.success) {
        console.log(response?.data);
        setBranches(response?.data);
      } else {
        console.error(response.message);
      }
    };

    fetchBranches();
  }, []);

  return (
    <Table className="bg-white border border-gray-400">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Branch Id</TableHead>
          <TableHead>Branch Name</TableHead>
          <TableHead>Branch Location</TableHead>
          <TableHead>Services</TableHead>
          <TableHead>Opening Time</TableHead>
          <TableHead>Closing Time</TableHead>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
