import Card from './Card';
import { homes } from '../dummy';
console.log(homes);

const Featured = () => {
  const featuredEl = homes.map((home, i) => {
    if (home.featured === true) {
      return <Card {...home} key={i} />;
    }
  });

  return (
    <section className="p-4 mt-12">
      <h1 className="text-2xl font-semibold mb-3">Featured properties</h1>
      <p className="text-sm text-gray-600 ">
        Explore our handpicked selection of featured properties. Each listing
        offers a glimpse into the exceptional homes and rentals we carefully
        filter through to make available to our customers.
      </p>

      <div className="featuredCards mt-12 flex flex-col gap-12">
        {featuredEl}
      </div>
    </section>
  );
};

export default Featured;
