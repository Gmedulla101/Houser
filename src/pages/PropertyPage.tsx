import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

//IMPORTING HELPER COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/LoaderComponent';

import bed from '../assets/bed.png';
import locationPointer from '../assets/location.png';

const PropertyPage = () => {
  type Property = {
    imgUrl: string;
    title: string;
    desc: string;
    bedrooms: number;
    propertyType: string;
    location: string;
    price: number;
    featured?: boolean;
  };

  const propertyId = useParams().id;
  const [property, setProperty] = useState<Property>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(
          `https://houser-backend.onrender.com/api/v1/properties/get-property/${propertyId}`
        );
        if (data) {
          setProperty(data.data.data);
          setIsLoading(false);
        } else {
          setProperty(undefined);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <section className="mt-24 xl:mt-28 md:p-0 px-2 xmd:px-12">
        <h1 className="text-3xl font-semibold pb-5 lg:text-4xl xl:text-6xl">
          {property?.title}
        </h1>

        <span className="priceAndLocation flex justify-between">
          <span className="flex items-center gap-3 border-2 border-gray-200 px-3 py-2 rounded-xl justify-center w-36 xl:w-72">
            <img src={locationPointer} alt="" className="w-5" />
            <p className="text-xs capitalize ">{property?.location}</p>
          </span>

          <span className="flex items-center gap-3 border-2 border-gray-200 px-3 py-2 rounded-xl justify-center w-24 xl:w-72">
            <img src={bed} alt="" className="w-5" />
            <p className="text-xs capitalize ">{property?.bedrooms}</p>
          </span>

          <span className="flex items-center justify-center gap-2 border-2 border-gray-200 px-3 py-2 rounded-xl xl:w-72">
            <p className="font-semibold"> Price:</p>
            <p> N{property?.price} </p>
          </span>
        </span>

        <div className="xl:flex xl:justify-between">
          <div className="img h-[400px] my-5 mx-auto overflow-hidden p-2 border-2 border-gray-200 rounded-xl xmd:h-[520px] xl:w-[50%]">
            <img
              src={property?.imgUrl}
              alt={`${property?.title}`}
              className="w-full h-full rounded-xl"
            />
          </div>

          <div className="img my-5 mx-auto overflow-hidden p-5 border-2 border-gray-200 rounded-xl xl:w-[40%] flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-5"> Description </h3>
              <p>{property?.desc}</p>
            </div>
            <button className="block font-semibold text-center px-2 py-3 mt-12 mx-auto w-full rounded-md bg-blue-600 text-white transition  hover:bg-white hover:text-blue-600 active:bg-blue-800 lg:px-6 lg:py-3">
              Request a tour
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PropertyPage;
