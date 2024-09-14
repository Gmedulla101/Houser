import Slider from './Slider';
import { homes } from '../dummy';

const Featured = () => {
  const featured = homes.filter((home) => {
    return home.featured === true;
  });

  return (
    <section className="px-2 mt-10 lg:px-12">
      <h1 className="text-3xl font-semibold mb-3 lg:text-4xl xl:text-6xl">
        Featured properties
      </h1>
      <p className="text-sm text-gray-600 ">
        Explore our handpicked selection of featured properties. Each listing
        offers a glimpse into the exceptional homes and rentals we carefully
        filter through to make available to our customers.
      </p>

      <div className="overflow-hidden mt-12 relative">
        <Slider features={featured} />
      </div>
    </section>
  );
};

export default Featured;
