'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getReservationHistory } from '@/actions/actions';

interface Reservation {
  id: number;
  branchName: string;
  branchLocation: string;
  serviceName: string;
  date: string;
  time: string;
}

export default function ReservationHistoryTable() {
  const [reservations, setReservations] = useState<Reservation[] | undefined>([]);
  const [userId, setUserId] = useState<string | undefined>();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id);
    } else {
      console.log('User is not authenticated');
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (userId) {
        const response = await getReservationHistory(userId);
        if (response.success) {
          setReservations(response.data);
        }
      }
    }
    fetchData();
  }, [userId]);

  return (
    <Table className="bg-white border border-gray-400">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Reservation ID</TableHead>
          <TableHead>Branch Name</TableHead>
          <TableHead>Branch Location</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations?.map((reservation) => (
          <TableRow key={reservation.id}>
            <TableCell className="font-medium">{reservation.id}</TableCell>
            <TableCell>{reservation.branchName}</TableCell>
            <TableCell>{reservation.branchLocation}</TableCell>
            <TableCell>{reservation.serviceName}</TableCell>
            <TableCell>{reservation.date}</TableCell>
            <TableCell>{reservation.time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
