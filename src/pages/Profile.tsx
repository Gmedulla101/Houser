//IMPORTING HELPER COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoaderComponent from '../components/LoaderComponent';

//IMPORTING NEEDED HOOKS
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

type UserDetails = {
  _id: string;
  username: string;
  fullName: string;
  email: string;
};

const Dashboard = () => {
  const [userData, setUserData] = useState<UserDetails>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      let token;
      const storedValue = localStorage.getItem('user');
      if (storedValue) {
        token = JSON.parse(storedValue);
      }
      try {
        setIsLoading(true);
        const data = await axios.get(
          'https://houser-backend.onrender.com/api/v1/auth/getUser',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
  const { setIsSignedIn, isSignedIn } = useGlobalContext();

  const logout = () => {
    localStorage.clear();
    setIsSignedIn(false);
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
              {' '}
              <h1 className="text-3xl font-semibold">Edit Profile</h1>
              <div className="editableDetails mt-8 flex flex-col gap-5">
                <span>
                  <h3 className="text-xl font-semibold">Email</h3>
                  <span className="flex gap-8">
                    <p> {userData?.email} </p>
                  </span>
                </span>

                <span>
                  <h3 className="text-xl font-semibold">Username</h3>
                  <span className="flex gap-8">
                    <p> {userData?.username} </p>
                  </span>
                </span>
              </div>
              <div className="basicDetails mt-12 flex flex-col gap-3">
                <span>
                  <p className="text-xl font-semibold">Full name:</p>
                  <p className="text-gray-600"> {userData?.fullName} </p>
                </span>
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
