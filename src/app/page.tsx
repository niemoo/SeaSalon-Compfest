import Navbar from '@/components/layout/Navbar';
import Salon1 from '../../public/salon1.jpg';
import Salon2 from '../../public/salon2.jpg';
import { GiHairStrands, GiFingernail } from 'react-icons/gi';
import { MdOutlineFaceRetouchingNatural } from 'react-icons/md';
import { SlCallIn } from 'react-icons/sl';
import HeroButtonSection from '@/components/layout/Button/HeroSectionButton';
import HomeReview from '@/components/layout/HomeReview';

export default function Home() {
  return (
    <main>
      <Navbar />
      <section id="home" className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Salon1.src})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex items-center h-full max-w-screen-xl mx-auto">
          <div className="md:w-1/2 px-5">
            <h1 className="text-zinc-100 text-4xl md:text-6xl font-bold z-10">
              Beauty and Elegance <span className="text-stone-400">Redefined</span>
            </h1>
            <p className="my-5 text-zinc-100">Beautiful things change the one's emotion in a very positive way, they just act as mood changing catalyst in the mind of person.</p>
            <HeroButtonSection />
          </div>
        </div>
      </section>
      <section id="service" className="flex items-center bg-white p-5 py-24">
        <div className="grid gap-10">
          <div className="w-fit mx-auto">
            <h2 className="text-4xl font-semibold text-center">Our Services</h2>
            <hr />
          </div>
          <div className="md:flex grid gap-5 justify-between items-center md:w-1/2 mx-auto">
            <div className="md:w-1/3 w-full border border-blue-300 rounded shadow-md p-5">
              <GiHairStrands className="text-5xl text-blue-600" />
              <h3 className="text-lg font-semibold my-5 text-blue-600">Haircuts and Styling</h3>
              <p className="text-sm text-zinc-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="md:w-1/3 w-full border border-green-300 rounded shadow-md p-5">
              <GiFingernail className="text-5xl text-green-600" />
              <h3 className="text-lg font-semibold my-5 text-green-600">Manicure and Pedicure</h3>
              <p className="text-sm text-zinc-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="md:w-1/3 w-full border border-yellow-300 rounded shadow-md p-5">
              <MdOutlineFaceRetouchingNatural className="text-5xl text-yellow-600" />
              <h3 className="text-lg font-semibold my-5 text-yellow-600">Facial Treatments</h3>
              <p className="text-sm text-zinc-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="reviews" className="py-24 md:px-0 px-5 bg-stone-400">
        <div className="w-fit mx-auto">
          <h2 className="text-4xl font-semibold text-center text-stone-900">Reviews</h2>
          <hr className="my-5" />
        </div>
        <HomeReview />
      </section>
      <section id="contacts" className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${Salon2.src})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex items-center h-full max-w-screen-xl mx-auto">
          <div className="mx-auto">
            <div className="w-fit mx-auto">
              <h2 className="text-4xl font-semibold text-center text-white">Get in touch</h2>
              <hr />
            </div>
            <div className="md:flex grid gap-5 items-center mx-auto mt-10">
              <div className="md:w-1/2 flex w-full border border-blue-300 rounded shadow-md p-5 bg-white">
                <SlCallIn className="text-5xl text-blue-600" />
                <div className="ml-5">
                  <h3 className="text-lg font-semibold text-blue-600">Thomas</h3>
                  <p className="text-sm text-zinc-500">08123456789</p>
                </div>
              </div>
              <div className="md:w-1/2 flex w-full border border-yellow-300 rounded shadow-md p-5 bg-white">
                <SlCallIn className="text-5xl text-yellow-600" />
                <div className="ml-5">
                  <h3 className="text-lg font-semibold text-yellow-600">Sekar</h3>
                  <p className="text-sm text-zinc-500">08164829372</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
