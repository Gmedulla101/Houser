import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGlobalContext } from '../context/userContext';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LoaderComponent from '../components/LoaderComponent';

import { User } from '../context/userContext';

import { BASE_API_URL } from '../components/Featured';

const PaymentConfirmation = () => {
  const [isPayVerified, setIsPayVerifed] = useState<boolean>(false);
  const [landlordDetails, setLandLordDetails] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const transactionRef = searchParams.get('trxref');

  const { userToken } = useGlobalContext();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setIsLoading(true);

        await axios.get(
          `${BASE_API_URL}/payments/verify-payment/${transactionRef}`
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
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_API_URL}/user/get-user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        setLandLordDetails(response.data.data[0]);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.message);
      }
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
          <p className="text-center">
            {' '}
            We will confirm your payment and grant you access to the details of
            the Caretaker/Landlord{' '}
          </p>
        </section>

        <section>
          {isLoading ? (
            <LoaderComponent />
          ) : (
            <>
              <div className="mt-10 shadow-perfect rounded-xl p-4 mx-auto md:w-[80%] lg:w-[70%] text-sm">
                <h1 className="text-center border border-blue-500 w-20 rounded-xl mx-auto text-blue-500 bg-blue-200 font-semibold">
                  {' '}
                  {landlordDetails?.verified ? 'verified' : 'unverified'}{' '}
                </h1>

                <span className="flex justify-between  p-2">
                  {' '}
                  <h2 className="w-40">Landlord name:</h2>{' '}
                  <p className="font-semibold"> {landlordDetails?.fullName} </p>{' '}
                </span>

                <span className="flex justify-between  p-2">
                  {' '}
                  <h2 className="w-56">Landlord username:</h2>{' '}
                  <p className="font-semibold"> {landlordDetails?.username} </p>{' '}
                </span>

                <span className="flex justify-between  p-2">
                  {' '}
                  <h2 className="w-56">Landlord email:</h2>{' '}
                  <p className="font-semibold"> {landlordDetails?.email} </p>{' '}
                </span>

                <span className="flex justify-between  p-2">
                  {' '}
                  <h2 className="w-40">Landlord Phone Number:</h2>{' '}
                  <p className="font-semibold">
                    {' '}
                    {landlordDetails?.phoneNumber
                      ? landlordDetails.phoneNumber
                      : 'No number added'}{' '}
                  </p>{' '}
                </span>
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PaymentConfirmation;
