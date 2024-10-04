import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/LoaderComponent';
import DisplayCards from '../components/DisplayCards';
import axios from 'axios';

//IMPORTING TYPES
import { PropertyDetails } from './CreatePost';

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<PropertyDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(
          'http://localhost:5000/api/v1/properties/featured-properties'
        );
        if (data) {
          setProperties(data.data.data);
          setIsLoading(false);
        } else {
          setProperties([]);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const propertyEl = properties.map((property: PropertyDetails, i: number) => {
    return <DisplayCards key={i} {...property} />;
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
        <h1 className="text-3xl font-semibold pb-5 lg:text-4xl">
          {' '}
          These are our most trusted and vetted properties, just{' '}
          <span className="text-blue-600"> pick and choose. </span>
        </h1>
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
            <option value="default"> Property type </option>
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
            <option value="default"> Pricing range </option>
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
            <option value="default"> Build year </option>
            <option value="2000"> {'< 2000'} </option>
            <option value="2000 - 2010"> 2000 - 2010 </option>
            <option value="2010 -2020"> 2010 - 2020 </option>
            <option value="2020"> {'> 2020'} </option>
          </select>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap gap-5 justify-center items-center my-12">
            {' '}
            {propertyEl}{' '}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default FeaturedProperties;
