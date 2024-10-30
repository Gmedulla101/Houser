import heroImg from '../assets/heroImg.png';

import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="p-4 mt-16 flex flex-col-reverse items-center md:flex-row xl:mt-16 md:p-0">
      <div className="heroText  flex flex-col justify-center items-center text-center gap-3 md:w-[40%] md:ml-2 lg:ml-12 md:text-left md:items-start">
        <h1 className="text-3xl font-semibold lg:text-4xl xl:text-6xl">
          Get rid of housing hassles with
          <span className="text-blue-800"> Houser</span>
        </h1>
        <p className="text-sm text-gray-600">
          Your journey to finding the perfect house for you begins here. Explore
          our listings to find the home that matches your dreams.
        </p>

        <span className="actionBtns flex gap-5 w-[90%] xmd:flex-row">
          <a
            href="#"
            className="block text-sm text-center border-2 px-2 py-3 border-slate-400 w-[80%]  rounded-md hover:scale-110 hover:bg-slate-300 transition lg:px-6 lg:py-3"
          >
            Learn more
          </a>
          <Link
            to={'/all-properties'}
            className="block text-sm text-center px-2 py-3 w-full  rounded-md bg-blue-600 text-white hover:scale-110 transition active:bg-blue-800 lg:px-6 lg:py-3"
          >
            Browse Properties
          </Link>
        </span>

        <div className="stats flex items-center justify-center w-full gap-6 mt-5 xmd:flex-row xl:mt-10">
          <div className="border-2 border-gray-400 px-4 py-2 rounded-md shadow-xl w-full">
            <p className="text-xl font-semibold lg:text-2xl xl:text-4xl">
              200+
            </p>
            <p className="text-xs lg:text-sm text-gray-600">Happy customers</p>
          </div>

          <div className="border-2 border-gray-400 px-4 py-2 rounded-md shadow-xl w-[80%]">
            <p className="text-xl font-semibold lg:text-2xl xl:text-4xl">
              {' '}
              1k+{' '}
            </p>
            <p className="text-xs text-gray-600 lg:text-sm">Properties</p>
          </div>
        </div>
      </div>

      {/* HERO SECTION IMAGE */}
      <div className="heroImg rounded-xl mb-12 overflow-hidden shadow-md md:w-[60%] md:shadow-none md:rounded-none">
        <img src={heroImg} alt="" className="w-full" />
      </div>
    </section>
  );
};

export default Hero;
