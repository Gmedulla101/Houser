import { useState, useEffect } from 'react';
import Slider from './Slider';
import { homes } from '../dummy';
import { Link } from 'react-router-dom';
import { PropertyDetails } from '../pages/CreatePost';

const Featured = () => {
  const [featuredProps, setFeaturedProps] = useState<PropertyDetails>();
  const featured = homes.filter((home) => {
    return home.featured === true;
  });

  return (
    <section className="px-2 mt-10 lg:px-12">
      <h1 className="text-3xl font-semibold mb-3 lg:text-4xl xl:text-6xl">
        Featured properties
      </h1>
      <p className="text-sm text-gray-600">
        Explore our handpicked selection of featured properties. Each listing
        offers a glimpse into the exceptional homes and rentals we carefully
        filter through to make available to our customers.
      </p>

      <div className="overflow-hidden mt-12 relative">
        <Slider sliderDetails={featured} />
        <Link
          to={'/featured-properties'}
          className="block text-sm text-center px-2 py-3 w-36  rounded-md bg-blue-600 text-white hover:scale-110 transition active:bg-blue-800 lg:px-6 lg:py-3 lg:w-56 relative -top-10"
        >
          {' '}
          Featured properties{' '}
        </Link>
      </div>
    </section>
  );
};

export default Featured;
