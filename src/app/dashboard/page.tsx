import AddReservationCard from '@/components/layout/Card/AddReservationCard';
import Navbar from '@/components/layout/Navbar';
import Review from '@/components/layout/Review';
import ReservationHistoryTable from '@/components/layout/Table/ReservationHistoryTable';

export default function Dashboard() {
  return (
    <main>
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-5 pt-3 mt-20">
        <div className="md:flex grid gap-5 items-center justify-between">
          <div className="w-fit">
            <h3 className="text-lg font-semibold">Reservations History</h3>
            <hr className="border border-blue-500" />
          </div>
          <AddReservationCard />
        </div>
        <hr className="my-5" />
        <ReservationHistoryTable />
        <hr className="mt-20 mb-5" />
        <div className="flex justify-center">
          <Review />
        </div>
      </div>
    </main>
  );
}
