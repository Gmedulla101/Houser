import { useState } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import searchIcon from '../assets/search.png';
import Slider from '../components/Slider';
import { homes } from '../dummy';

const Properties = () => {
  const featured = homes.filter((home) => {
    return home.featured === true;
  });

  const [filterObj, setFilterObj] = useState({
    location: '',
    propertyType: '',
    pricingRange: '',
    buildYear: '',
  });
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setFilterObj((prevObj) => {
      return { ...prevObj, [name]: value };
    });
  };

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
          <div className="filter mt-5 md:flex md:gap-2">
            <select
              onChange={handleChange}
              name="location"
              id="location"
              className="w-full border-2 border-gray-200 rounded-lg py-2 mb-3 outline-none text-center cursor-pointer"
            >
              <option value="default"> Location </option>
              <option value="Ekosodin"> Ekosodin </option>
              <option value="Osasogie"> Osasogie </option>
              <option value="BDPA"> BDPA </option>
            </select>
            <select
              onChange={handleChange}
              name="propertyType"
              id="propertyType"
              className="w-full border-2 border-gray-200 rounded-lg py-2 mb-3 outline-none text-center cursor-pointer"
            >
              <option value=""> Property type </option>
              <option value="self-con"> Self-con </option>
              <option value="a room and parlour"> A room and parlour </option>
              <option value="2 bedroom flat"> 2 bedroom flat </option>
              <option value="3 bedroom flat"> 3 bedroom flat </option>
              <option value="bungalow"> Bungalow </option>
              <option value="duplex"> Duplex </option>
            </select>
            <select
              onChange={handleChange}
              name="pricingRange"
              id="pricingRange"
              className="w-full border-2 border-gray-200 rounded-lg py-2 mb-3 outline-none text-center cursor-pointer"
            >
              <option value=""> Pricing range </option>
              <option value="50000 - 100000"> N50,000 - N100,000 </option>
              <option value="100000 - 200000"> N100,000 - N200,000 </option>
              <option value="200000 - 300000"> N200,000 - N300,000 </option>
              <option value="300000 - 400000"> N300,000 - N400,000 </option>
              <option value="400000 - 500000"> N400,000 - N500,000 </option>
              <option value="500000 - 1000000"> N500,000 - N1000,000 </option>
              <option value="1000000 - e"> 1000,000 - </option>
            </select>

            <select
              onChange={handleChange}
              name="buildYear"
              id="buildYear"
              className="w-full border-2 border-gray-200 rounded-lg py-2 mb-3 outline-none text-center cursor-pointer"
            >
              <option value=""> Build year </option>
              <option value="2000"> {'< 2000'} </option>
              <option value="2000 - 2010"> 2000 - 2010 </option>
              <option value="2010 -2020"> 2010 - 2020 </option>
              <option value="2020"> {'> 2020'} </option>
            </select>
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
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
};

export default Properties;
