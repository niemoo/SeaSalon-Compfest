'use client';

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="max-w-screen-xl mx-auto py-5 flex justify-between">
        <button onClick={() => scrollToSection('home')}>SeaSalon</button>
        <ul className="list-none flex items-center gap-10">
          <li>
            <button onClick={() => scrollToSection('home')} className="py-1 px-3 rounded hover:bg-slate-200">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('service')} className="py-1 px-3 rounded hover:bg-slate-200">
              Service
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
