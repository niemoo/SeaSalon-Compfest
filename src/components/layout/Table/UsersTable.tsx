'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAllUsers } from '@/actions/actions';

interface Users {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
}

export default function UsersTable() {
  const [users, setUsers] = useState<Users[] | undefined>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (response?.success) {
        setUsers(response?.data);
      } else {
        console.error(response.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Table className="bg-white border border-gray-400">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">User Id</TableHead>
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user?.id}>
            <TableCell className="font-medium">{user?.id}</TableCell>
            <TableCell>{user?.full_name}</TableCell>
            <TableCell>{user?.email}</TableCell>
            <TableCell>{user?.phone_number}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
