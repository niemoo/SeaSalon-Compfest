'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAllBranches } from '@/actions/actions'; // Sesuaikan dengan path fungsi prisma Anda

interface Branches {
  id: number;
  name: string;
  location: string;
  opening_time: string;
  closing_time: string;
}

export default function BranchesTable() {
  const [branches, setBranches] = useState<Branches[] | undefined>([]);

  useEffect(() => {
    const fetchBranches = async () => {
      const response = await getAllBranches();
      if (response?.success) {
        setBranches(response?.data);
      } else {
        console.error(response.message);
      }
    };

    fetchBranches();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Branch Id</TableHead>
          <TableHead>Branch Name</TableHead>
          <TableHead>Branch Location</TableHead>
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
            <TableCell>{branch?.opening_time}</TableCell>
            <TableCell>{branch?.closing_time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
