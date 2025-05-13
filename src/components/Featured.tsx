import { useState, useEffect } from 'react';
import LoaderComponent from './LoaderComponent';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from '@mantine/carousel';
import { rem } from '@mantine/core';
import Card from './Card';
import CIcon from '@coreui/icons-react';
import { cilArrowThickRight, cilArrowThickLeft } from '@coreui/icons';

//IMPORTING TYPES
import { PropertyDetails } from '../pages/CreatePost';

//IMPORTING AND THEN EXPORT THE BASE API URL
export const BASE_API_URL = import.meta.env.VITE_API_URL;

const Featured = () => {
  const [featuredProps, setFeaturedProps] = useState<PropertyDetails[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    const getFeaturedPosts = async () => {
      try {
        const data = await axios.get(
          `${BASE_API_URL}/api/v1/properties/featured-properties`
        );
        const limitedFeatures = data?.data?.data?.slice(0, 6);
        setFeaturedProps(limitedFeatures);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setErrorMsg(error?.response?.data?.msg);
        console.error(error);
      }
    };

    getFeaturedPosts();
  }, []);

  return (
    <section className="px-4 mt-10 lg:px-12">
      <h1 className="text-3xl font-semibold mb-3 lg:text-4xl xl:text-6xl">
        Featured properties
      </h1>
      <p className="text-sm text-gray-600">
        Explore our handpicked selection of featured properties. Each listing
        offers a glimpse into the exceptional homes and rentals we carefully
        filter through to make available to our customers.
      </p>

      {isLoading ? (
        <LoaderComponent size="100" />
      ) : (
        <div className="mt-12">
          <Carousel
            slideSize={'25%'}
            slideGap={'lg'}
            align={'start'}
            slidesToScroll={1}
            height={600}
            withControls={window.innerWidth > 1024 ? true : false}
            nextControlIcon={
              <CIcon
                icon={cilArrowThickRight}
                style={{ width: rem(50), height: rem(50) }}
                className="rightBtn hidden rounded-full p-3 relative transition hover:scale-110 active:scale-90 lg:block"
              />
            }
            previousControlIcon={
              <CIcon
                icon={cilArrowThickLeft}
                style={{ width: rem(50), height: rem(50) }}
                className="leftBtn hidden rounded-full p-3 transition hover:scale-110 active:scale-90 lg:block"
              />
            }
            className="px-3 xmd:px-20"
          >
            {featuredProps?.map((feature, i) => {
              return (
                <Carousel.Slide key={i}>
                  <Card {...feature} />
                </Carousel.Slide>
              );
            })}
          </Carousel>
          <Link
            to={'/featured-properties'}
            className="block text-sm text-center px-2 py-3 w-36  rounded-md bg-blue-600 text-white hover:scale-110 transition active:bg-blue-800 lg:px-6 lg:py-3 lg:w-56 relative -top-5"
          >
            See more
          </Link>
          <div className="flex justify-center">{errorMsg}</div>
        </div>
      )}
    </section>
  );
};

export default Featured;
