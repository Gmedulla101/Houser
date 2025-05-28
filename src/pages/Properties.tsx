import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/LoaderComponent';

//IMPORTING MANTINE UI COMPONENTS
import { Carousel } from '@mantine/carousel';
import { rem } from '@mantine/core';
import Card from '../components/Card';
import CIcon from '@coreui/icons-react';
import { cilArrowThickRight, cilArrowThickLeft } from '@coreui/icons';

//IMPORTING TYPES
import { PropertyDetails } from './CreatePost';

//IMPORTING BASE API URL
import { BASE_API_URL } from '../components/Featured';

const Properties = () => {
  const [properties, setProperties] = useState<PropertyDetails[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(
          `${BASE_API_URL}/properties/all-properties`
        );
        if (data) {
          setProperties(data.data.data);
          setIsLoading(false);
        } else {
          setProperties(undefined);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <section className="mt-24 xl:mt-28 md:p-0 px-4 xmd:px-12">
        <section>
          <h1 className="text-3xl font-semibold pb-5 lg:text-4xl xl:text-6xl">
            Find your dream property
          </h1>
          <p className="text-sm text-gray-600">
            Welcome to Houser, where your dream property awaits in every corner
            of our beautiful world. Explore our curated selection of properties,
            each offering a unique story and a chance to redefine your life.
          </p>

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
            {isLoading ? (
              <Loader size="100" />
            ) : (
              <div className="overflow-hidden mt-12 relative xxsm:pl-10">
                {properties ? (
                  <>
                    <Carousel
                      slideSize={'25%'}
                      slideGap={'lg'}
                      loop
                      align={'start'}
                      slidesToScroll={1}
                      height={600}
                      withControls={window.innerWidth > 1024 ? true : false}
                      nextControlIcon={
                        <CIcon
                          icon={cilArrowThickRight}
                          style={{ width: rem(50), height: rem(50) }}
                          className="rounded-full p-3 hidden lg:block"
                        />
                      }
                      previousControlIcon={
                        <CIcon
                          icon={cilArrowThickLeft}
                          style={{ width: rem(50), height: rem(50) }}
                          className="rounded-full p-3 hidden lg:block"
                        />
                      }
                      className="px-3 xmd:px-20"
                    >
                      {properties?.map((property, i) => {
                        return (
                          <Carousel.Slide key={i}>
                            {' '}
                            <Card {...property} key={i} />{' '}
                          </Carousel.Slide>
                        );
                      })}
                    </Carousel>
                    <Link
                      to={'/all-properties'}
                      className="block text-sm text-center px-2 py-3 w-36  rounded-md bg-blue-600 text-white hover:scale-110 transition active:bg-blue-800 lg:px-6 lg:py-3 lg:w-56 relative -top-5"
                    >
                      All properties
                    </Link>
                  </>
                ) : (
                  ''
                )}
              </div>
            )}
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
};

export default Properties;
