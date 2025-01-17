import LoginForm from '@/components/layout/Form/LoginForm';
import Navbar from '@/components/layout/Navbar';

export default function Login() {
  return (
    <main className="max-w-screen-sm mx-auto mt-44 md:p-0 px-5">
      <Navbar />
      <LoginForm />
    </main>
  );
}
