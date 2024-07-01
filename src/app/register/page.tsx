import RegisterForm from '@/components/layout/Form/RegisterForm';
import Navbar from '@/components/layout/Navbar';

export default function Register() {
  return (
    <main className="max-w-screen-sm mx-auto mt-44 md:p-0 px-5">
      <Navbar />
      <RegisterForm />
    </main>
  );
}
