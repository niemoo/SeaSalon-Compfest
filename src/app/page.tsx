import Salon1 from '../../public/salon1.jpg';

export default function Home() {
  return (
    <main>
      <section id="home" className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Salon1.src})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex items-center justify-center h-full">
          <h1 className="text-white text-4xl md:text-6xl font-bold z-10">Beauty and Elegance Redefined</h1>
        </div>
      </section>
      <section id="service" className="h-screen flex items-center justify-center bg-gray-200">
        <h2 className="text-2xl font-semibold">Our Services</h2>
      </section>
    </main>
  );
}
