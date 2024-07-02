'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAllUsers, updateUser, deleteUser } from '@/actions/actions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Users {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
}

export default function UsersTable() {
  const [users, setUsers] = useState<Users[] | undefined>([]);
  const [editUser, setEditUser] = useState<Users | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

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

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editUser) {
      const response = await updateUser({
        id: editUser.id,
        full_name: fullName,
        email: email,
        phone_number: phoneNumber,
        password,
      });
      if (response.success) {
        setUsers((prevUsers) => prevUsers?.map((user) => (user.id === editUser.id ? { ...user, full_name: fullName, email, phone_number: phoneNumber } : user)));
        setEditUser(null);
      } else {
        alert(response.message);
      }
    }
  };

  const onDeleteHandle = async (userId: string) => {
    const result = await deleteUser(userId);
    if (result.success) {
      alert(result.message);
      setUsers((prevUsers) => prevUsers?.filter((user) => user.id !== userId));
    } else {
      alert(result.message);
    }
  };

  const openUpdateDialog = (user: Users) => {
    setEditUser(user);
    setFullName(user.full_name);
    setEmail(user.email);
    setPhoneNumber(user.phone_number);
    setPassword(''); // Clear password field when opening the dialog
  };

  return (
    <Table className="bg-white">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">User Id</TableHead>
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.full_name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone_number}</TableCell>
            <TableCell className="flex">
              <Dialog>
                <DialogTrigger className="flex items-center border border-yellow-300 bg-white hover:bg-yellow-500 text-black hover:text-white rounded px-3 py-2" onClick={() => openUpdateDialog(user)}>
                  Edit
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>
                      <form onSubmit={handleUpdateSubmit} className="grid gap-5">
                        <div className="grid w-full items-center gap-1.5">
                          <Label htmlFor="full_name" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                            Full Name
                          </Label>
                          <Input type="text" id="full_name" name="full_name" placeholder="Enter Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                          <Label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                            Email
                          </Label>
                          <Input type="email" id="email" name="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                          <Label htmlFor="phone_number" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                            Phone Number
                          </Label>
                          <Input type="text" id="phone_number" name="phone_number" placeholder="Enter Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                          <Label htmlFor="password">Password</Label>
                          <Input type="password" id="password" name="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="flex justify-end">
                          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Update User
                          </button>
                        </div>
                      </form>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <button className="ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={() => onDeleteHandle(user.id)}>
                Delete
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
