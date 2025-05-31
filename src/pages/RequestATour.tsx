import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/userContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Property } from './PropertyPage';

import { BASE_API_URL } from '../components/Featured';

//IMPORTING HELPER COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';

import hunting from '../assets/hunting.png';
import LoaderComponent from '../components/LoaderComponent';
const RequestATour = () => {
  const propertyId = useParams().id;
  const [property, setProperty] = useState<Property>();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { userData } = useGlobalContext();

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

  const makePayment = async () => {
    try {
      setPaymentLoading(true);
      const { email } = userData;
      const amount = property!.price;

      const response = await axios.post(
        `${BASE_API_URL}/payments/initialize-payment`,
        { email, amount, propertyId }
      );

      const { authorization_url } = response.data;
      setPaymentLoading(false);
      window.location.href = authorization_url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <section className="mt-24 px-5 xmd:px-10">
        <h1 className="font-semibold text-2xl md:text-4xl lg:text-5xl">
          Let's get your <span className="text-blue-600">house hunting</span>{' '}
          started!
        </h1>
        <p className="mt-5">
          Finding properties and connecting to caretakers and landlords has
          never been easier or{' '}
          <span className="text-blue-600 font-semibold">cheaper!</span>
        </p>

        <p className="mt-5">
          To keep <span className="text-blue-600 font-semibold">Houser</span>{' '}
          running, we require a fee to connect our users (You lovely people) to
          overseers of their desired property
        </p>

        {isLoading ? (
          <LoaderComponent size="50px" />
        ) : (
          <>
            <div className="mt-10 rounded-xl shadow-perfect p-4 flex items-center justify-between md:w-[70%] md:mx-auto">
              <div className="flex items-center gap-1">
                <span className="block h-10 w-10 rounded-xl">
                  {' '}
                  <img src={hunting} alt="" />{' '}
                </span>

                <h2 className="text-lg font-semibold">
                  {' '}
                  House hunting permit{' '}
                </h2>
              </div>

              {property && (
                <div className="font-semibold">
                  {' '}
                  #{((5 / 100) * property?.price).toLocaleString()}{' '}
                </div>
              )}
            </div>

            <div>
              {' '}
              <button
                onClick={makePayment}
                className="block font-semibold text-center px-2 py-3 mt-8 mx-auto w-1/2 rounded-md bg-blue-600 text-white transition active:bg-blue-800 lg:px-6 lg:py-3"
              >
                {paymentLoading ? (
                  <LoaderComponent size="30" margin="1" color="white" />
                ) : (
                  'Make payment'
                )}
              </button>{' '}
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default RequestATour;
