import { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import searchIcon from '../assets/search.png';
import Slider from '../components/Slider';
import { homes } from '../dummy';

const Properties = () => {
  const featured = homes.filter((home) => {
    return home.featured === true;
  });

  return (
    <>
      <Header />
      <section className="mt-24 xl:mt-28 md:p-0 px-2 xmd:px-12">
        <section>
          <h1 className="text-3xl font-semibold pb-5 lg:text-4xl xl:text-6xl">
            Find your dream property
          </h1>
          <p className="text-sm text-gray-600">
            Welcome to Houser, where your dream property awaits in every corner
            of our beautiful world. Explore our curated selection of properties,
            each offering a unique story and a chance to redefine your life.
            With categories to suit every dreamer, your journey
          </p>

          <div className="searchInput flex justify-between mt-12 p-2 border-2 border-gray-200 rounded-lg shadow-lg">
            <input
              type="text"
              placeholder="Search for a property"
              className="outline-none w-[80%]"
            />

            <button className="bg-blue-600 flex gap-2 items-center py-2 px-4 rounded-lg justify-between hover:bg-blue-700">
              <img className="w-5" src={searchIcon} alt="Search icon" />

              <p className="bg-blue-600 text-white text-xs hidden xsm:block">
                Find property
              </p>
            </button>
          </div>

          <div className="mt-12">
            <h1 className="text-3xl font-semibold pb-5 lg:text-4xl xl:text-6xl">
              {' '}
              Discover a world of possibilities{' '}
            </h1>
            <p className="text-sm text-gray-600">
              Our portfolio of properties is as diverse as your dreams. Explore
              the following categories to find the perfect property that
              resonates with your vision of home.
            </p>
            <div className="overflow-hidden mt-12 relative xxsm:pl-10">
              <Slider sliderDetails={featured} />
              <Link
                to={'/all-properties'}
                className="block text-sm text-center px-2 py-3 w-36  rounded-md bg-blue-600 text-white hover:scale-110 transition active:bg-blue-800 lg:px-6 lg:py-3 lg:w-56 relative -top-10"
              >
                {' '}
                All properties{' '}
              </Link>
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
};

export default Properties;
