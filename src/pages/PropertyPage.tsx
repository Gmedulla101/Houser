import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../context/userContext';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

//IMPORTING HELPER COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoaderComponent from '../components/LoaderComponent';
import AuthModal from '../components/AuthModal';

//IMPORTING UI COMPONENTS
import { Carousel } from '@mantine/carousel';

//IMPORTING IMAGE ASSETS
import bed from '../assets/bed.png';
import locationPointer from '../assets/location.png';

import { BASE_API_URL } from '../components/Featured';

export type Property = {
  imgUrl: any;
  title: string;
  desc: string;
  bedrooms: number;
  propertyType: string;
  location: string;
  price: number;
  featured?: boolean;
};

const PropertyPage = () => {
  const propertyId = useParams().id;
  const [property, setProperty] = useState<Property>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //SCROLL TO TOP ON COMPONENT MOUNT

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const fetchData = async () => {
      try {
        const data = await axios.get(
          `${BASE_API_URL}/properties/get-property/${propertyId}`
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

  const { isSignedIn } = useGlobalContext();

  const [isModal, setIsModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const requestTour = () => {
    if (!isSignedIn) {
      setIsModal(true);
      return;
    } else {
      navigate(`/request-tour/${propertyId}`);
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <LoaderComponent size="100" />
      ) : (
        <section className="mt-24 xl:mt-28 md:p-0 px-4 xmd:px-12 propertyPage">
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
              <p> N{property?.price.toLocaleString()} </p>
            </span>
          </span>

          <div className="xl:flex xl:justify-between xl:items-center">
            <div className="img flex h-[400px] my-5 mx-auto overflow-hidden p-2 border-2 border-gray-200 rounded-xl xmd:h-[520px] xl:w-[50%]">
              <Carousel
                withIndicators
                height="100%"
                dragFree
                loop
                slideGap="md"
                align="start"
                className="flex-1"
              >
                {property?.imgUrl.map((img: string, i: number) => {
                  return (
                    <Carousel.Slide key={i}>
                      <img
                        src={img}
                        alt={`${property?.title}`}
                        className="w-full h-full rounded-xl"
                      />
                    </Carousel.Slide>
                  );
                })}
              </Carousel>
            </div>

            <div className="img h-[450px] my-5 mx-auto overflow-hidden p-5 border-2 border-gray-200 rounded-xl xl:w-[40%] flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg"> Description </h3>
                <p className="text-sm text-gray-400 my-2">
                  {property?.featured ? 'Featured' : ''}
                </p>
                <div className="h-[250px] overflow-y-scroll">
                  <p>{property?.desc}</p>
                </div>
              </div>
              <button
                onClick={requestTour}
                className="block font-semibold text-center px-2 py-3 mt-8 mx-auto w-full rounded-md bg-blue-600 text-white transition  hover:bg-gray-200 hover:text-blue-600 active:bg-blue-800 lg:px-6 lg:py-3"
              >
                Request a tour
              </button>
            </div>
          </div>

          <div>
            {isModal
              ? createPortal(
                  <AuthModal isModal={isModal} setIsModal={setIsModal} />,
                  document.body
                )
              : ''}
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default PropertyPage;
