import { useState, useEffect } from 'react';
import Slider from './Slider';
import LoaderComponent from './LoaderComponent';
import { homes } from '../dummy';
import { Link } from 'react-router-dom';
import axios from 'axios';

//IMPORTING TYPES
import { PropertyDetails } from '../pages/CreatePost';
import Properties from '../pages/Properties';

const Featured = () => {
  const [featuredProps, setFeaturedProps] = useState<PropertyDetails[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    const getFeaturedPosts = async () => {
      try {
        const data = await axios.get(
          'http://localhost:5000/api/v1/properties/featured-properties'
        );
        setFeaturedProps(data.data.data);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setErrorMsg(error.response.data.msg);
        console.error(error);
      }
    };

    getFeaturedPosts();
  }, []);

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

      <div>
        {featuredProps ? (
          <div className="overflow-hidden mt-12 relative">
            <Slider sliderDetails={featuredProps} />
            <Link
              to={'/featured-properties'}
              className="block text-sm text-center px-2 py-3 w-36  rounded-md bg-blue-600 text-white hover:scale-110 transition active:bg-blue-800 lg:px-6 lg:py-3 lg:w-56 relative -top-10"
            >
              {' '}
              Featured properties{' '}
            </Link>
          </div>
        ) : (
          <h1> There are currently no featured posts available </h1>
        )}
      </div>
    </section>
  );
};

export default Featured;
