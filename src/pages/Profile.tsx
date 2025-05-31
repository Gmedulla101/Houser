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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editData, setEditData] = useState({
    fullName: '',
    email: '',
    username: '',
    phoneNumber: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const data = await axios.get(`${BASE_API_URL}/user/getUserProfile`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setUserData(data.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const logout = async () => {
    await axios.get(`${BASE_API_URL}/auth/logout`);
    localStorage.removeItem('houser-user');
    localStorage.removeItem('userData');
    setIsSignedIn(false);
    setUser(null);
    navigate('/');
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setIsEditing(true);

    setEditData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleEdit = async () => {
    try {
      await axios.patch(
        `${BASE_API_URL}/user/updateUser/${userData?._id}`,
        { editData },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <LoaderComponent size="100" />
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
                <div className="mb-5">
                  <h1 className="font-bold text-2xl lg:text-3xl">
                    Personal Information
                  </h1>
                  <span className="flex items-center justify-between mt-5">
                    <p className="font-medium text-sm text-gray-500">
                      Start typing to edit your information
                    </p>
                    {isEditing ? (
                      <button
                        onClick={handleEdit}
                        className="block text-sm text-center px-2 py-3 w-20  rounded-md bg-blue-600 text-white hover:scale-110 transition active:bg-blue-800 lg:px-6 lg:py-3"
                      >
                        Edit
                      </button>
                    ) : (
                      ''
                    )}
                  </span>
                </div>

                {/* FIRST NAME AND USERNAME */}
                <div className="flex flex-col gap-6 lg:flex-row">
                  <span className="flex flex-col gap-1 w-full">
                    <label htmlFor="fullName" className="font-medium text-sm">
                      {' '}
                      Full Name{' '}
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder={userData?.fullName}
                      name="fullName"
                      onChange={handleChange}
                      className="border-2 border-slate-400 h-12 rounded-md px-3 text-sm outline-none focus:border-2 focus:border-[#12362A]"
                    />
                  </span>

                  <span className="flex flex-col gap-1 w-full">
                    <label htmlFor="username" className="font-medium text-sm">
                      {' '}
                      Username{' '}
                    </label>
                    <input
                      type="text"
                      id="username"
                      placeholder={userData?.username}
                      name="username"
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                        userData?.phoneNumber
                          ? `+234${userData?.phoneNumber}`
                          : 'Please add your phone number'
                      }`}
                      name="phoneNumber"
                      onChange={handleChange}
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
