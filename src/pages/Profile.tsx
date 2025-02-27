//IMPORTING HELPER COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoaderComponent from '../components/LoaderComponent';

//IMPORTING NEEDED HOOKS
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

///
import { BASE_API_URL } from '../components/Featured';

type UserDetails = {
  _id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email: string;
  phoneNumber?: string;
  createdAt?: string;
  status?: string;
};

const Dashboard = () => {
  const { setIsSignedIn, isSignedIn, setUser, userToken } = useGlobalContext();
  const [userData, setUserData] = useState<UserDetails>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const data = await axios.get(`${BASE_API_URL}/api/v1/user/getUser`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setUserData(data.data.data[0]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const navigate = useNavigate();

  const logout = async () => {
    await axios.get('http://localhost:5000/api/v1/auth/logout');
    localStorage.removeItem('user');
    setIsSignedIn(false);
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <section className="px-4 mt-24">
          {!isSignedIn ? (
            <h1 className="text-3xl font-semibold text-center my-48">
              {' '}
              You must be signed in to access this page{' '}
            </h1>
          ) : (
            <>
              {/* USER INFO */}
              <div className="mt-8 px-8 lg:px-36">
                <h1 className="font-bold text-2xl mb-12 lg:text-3xl">
                  Personal Information
                </h1>
                {/* FIRST NAME AND LAST NAME */}
                <div className="flex flex-col gap-6 lg:flex-row">
                  <span className="flex flex-col gap-1 w-full">
                    <label htmlFor="firstName" className="font-medium text-sm">
                      {' '}
                      First Name{' '}
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder={
                        userData?.fullName?.split(' ')[0] || userData?.firstName
                      }
                      name="firstName"
                      className="border-2 border-slate-400 h-12 rounded-md px-3 text-sm outline-none focus:border-2 focus:border-[#12362A]"
                    />
                  </span>

                  <span className="flex flex-col gap-1 w-full">
                    <label htmlFor="firstName" className="font-medium text-sm">
                      {' '}
                      Last Name{' '}
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder={
                        userData?.fullName?.split(' ')[1] || userData?.lastName
                      }
                      name="lastName"
                      className="border-2 border-slate-400 h-12 rounded-md px-3 text-sm outline-none focus:border-2 focus:border-[#12362A]"
                    />
                  </span>
                </div>

                {/* EMAIL AND PHONE NUMBER */}
                <div className="flex flex-col gap-6 mt-8 lg:flex-row">
                  <span className="flex flex-col gap-1 w-full">
                    <label htmlFor="firstName" className="font-medium text-sm">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder={`${userData?.email}`}
                      name="email"
                      className="border-2 border-slate-400 h-12 rounded-md px-3 text-sm outline-none focus:border-2 focus:border-[#12362A]"
                    />
                  </span>

                  <span className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="phoneNumber"
                      className="font-medium text-sm"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="phonerNumber"
                      placeholder={`${
                        Number(userData?.phoneNumber) ||
                        'Please add your phone number'
                      }`}
                      name="phoneNumber"
                      className="border-2 border-slate-400 h-12 rounded-md px-3 text-sm outline-none focus:border-2 focus:border-[#12362A]"
                    />
                  </span>
                </div>

                {/* JOIN DATE */}
                <div className="flex gap-6 mt-8">
                  <span className="flex flex-col gap-1 w-full">
                    <label htmlFor="joinDate" className="font-medium text-sm">
                      Join Date
                    </label>
                    <input
                      type="text"
                      id="joinDate"
                      placeholder={
                        userData?.createdAt?.split('T')[0] || 'When you joined'
                      }
                      disabled
                      name="joinDate"
                      className="border-2 border-slate-400 h-12 rounded-md px-3 text-sm outline-none focus:border-2 focus:border-[#12362A]"
                    />
                  </span>
                </div>

                {/* COUNTRY AND CITY */}
                <div className="flex flex-col gap-6 mt-8 lg:flex-row">
                  <span className="flex flex-col gap-1 w-full">
                    <label htmlFor="country" className="font-medium text-sm">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      placeholder="User Country"
                      name="country"
                      className="border-2 border-slate-400 h-12 rounded-md px-3 text-sm"
                    />
                  </span>

                  <span className="flex flex-col gap-1 w-full">
                    <label htmlFor="city" className="font-medium text-sm">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      placeholder="User City"
                      name="city"
                      className="border-2 border-slate-400 h-12 rounded-md px-3 text-sm"
                    />
                  </span>
                </div>
              </div>
              <div className="logout flex justify-center">
                <button
                  onClick={logout}
                  className="block text-sm text-center px-2 py-3 my-12 w-64  rounded-md bg-blue-600 text-white hover:scale-110 transition active:bg-blue-800 lg:px-6 lg:py-3"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </section>
      )}
      <Footer />
    </>
  );
};

export default Dashboard;
