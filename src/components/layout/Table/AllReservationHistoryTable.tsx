'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAllReservationHistory, deleteReservation } from '@/actions/actions';

interface Reservation {
  id: number;
  branchName: string;
  branchLocation: string;
  serviceName: string;
  date: string;
  time: string;
}

export default function AllReservationHistoryTable() {
  const [reservations, setReservations] = useState<Reservation[] | undefined>([]);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getAllReservationHistory();

      if (response.success) {
        setReservations(response.data);
      }
    }
    fetchData();
  }, []);

  const onDeleteHandle = async (reservationId: number) => {
    const result = await deleteReservation(reservationId);

    if (result.success) {
      alert(result.message);
      setReservations((prevReservations) => prevReservations?.filter((reserve) => reserve.id !== reservationId));
    } else {
      alert(result.message);
    }
  };

  return (
    <Table className="bg-white">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Reservation ID</TableHead>
          <TableHead>Branch Name</TableHead>
          <TableHead>Branch Location</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Action</TableHead>
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
            <TableCell>
              <button className="ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={() => onDeleteHandle(reservation.id)}>
                Delete
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
