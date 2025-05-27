import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGlobalContext } from '../context/userContext';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LoaderComponent from '../components/LoaderComponent';

const TEST_API = import.meta.env.VITE_TEST_API;

const PaymentConfirmation = () => {
  const [isPayVerified, setIsPayVerifed] = useState<boolean>(false);
  const [landlordDetails, setLandLordDetails] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const transactionRef = searchParams.get('trxref');

  const { userToken } = useGlobalContext();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setIsLoading(true);

        await axios.get(
          `${TEST_API}/payments/verify-payment/${transactionRef}`
        );

        setIsLoading(false);
        setIsPayVerifed(true);
        toast.success('Payment verified');
      } catch (error) {
        setIsLoading(false);
        toast.error('Payment could not be verified, refresh to try again');
      }
    };

    verifyPayment();
  }, []);

  useEffect(() => {
    const getLandLordDetails = async () => {
      const response = await axios.get(`${TEST_API}/user/get-user/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setLandLordDetails(response.data.data[0]);
    };

    getLandLordDetails();
  }, [isPayVerified]);

  return (
    <>
      <Header />
      <ToastContainer />
      <main className="mt-24  px-5 xmd:px-10">
        <section>
          <h1 className="text-center text-2xl font-bold md:text-3xl">
            {' '}
            Confirmation of payment{' '}
          </h1>
          <p>
            {' '}
            We will confirm your payment and grant you access to the details of
            the Caretaker/Landlord{' '}
          </p>
        </section>

        <section></section>
      </main>

      <Footer />
    </>
  );
};

export default PaymentConfirmation;
