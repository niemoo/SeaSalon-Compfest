import ReservationForm from '@/components/layout/Form/ReservationForm';
import Navbar from '@/components/layout/Navbar';

export default function Reservation() {
  return (
    <main className="max-w-screen-sm mx-auto mt-44 md:p-0 px-5">
      <Navbar />
      <ReservationForm />
    </main>
  );
}
