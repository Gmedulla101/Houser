import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/userContext';

//IMPORTING HELPER COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoaderComponent from '../components/LoaderComponent';

//IMPORTING IMAGE ASSETS
import home from '../assets/home.png';
import hidden from '../assets/hidden.png';
import eye from '../assets/eye.png';

const SignUp = () => {
  const navigate = useNavigate();
  const { setIsSignedIn, setUser } = useGlobalContext();

  const [isPassword, setIsPassword] = useState<boolean>(true);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    status: '',
    phoneNumber: '',
    country: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const { confirmPassword, password, email, username, fullName } = form;
    if (!form) {
      setErrorMsg('Please fill in the appopriate details');
      return;
    }
    if (confirmPassword !== password) {
      setErrorMsg('Passwords do not match');
      return;
    }
    try {
      setIsLoading(true);
      const data = await axios.post(
        'https://houser-backend.onrender.com/api/v1/auth/register-user',
        {
          email,
          password,
          username,
          fullName,
        }
      );
      const userToken = data.data.token;
      localStorage.setItem('user', JSON.stringify(userToken));
      localStorage.setItem(
        'userData',
        JSON.stringify({
          username: data.data.username,
          email: data.data.email,
          fullName: data.data.fullName,
          id: data.data.id,
        })
      );
      setIsSignedIn(true);
      setUser({
        username: data.data.username,
        email: data.data.email,
        fullName: data.data.fullName,
        id: data.data.id,
      });
      navigate('/');
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
      setErrorMsg(error.response.data.msg);
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <section className="mt-24 flex flex-col items-center">
          <img src={home} alt="home" className="w-48 mb-12" />

          <div className="errorPopup">
            {' '}
            {errorMsg ? (
              <p className="border-2 border-red-400 bg-red-300 text-white font-semibold px-4 py-2 mb-2 rounded-lg transtion">
                {errorMsg}
              </p>
            ) : (
              ''
            )}
          </div>

          <form className="signUpForm flex flex-col gap-5 items-center w-[90%] md:w-96">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your Email"
              onChange={handleFormChange}
              value={form.email}
              className="border-2 border-gray-300 w-full py-2 px-4 rounded-lg outline-none focus:border-blue-600"
            />

            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={handleFormChange}
              value={form.username}
              className="border-2 border-gray-300 w-full py-2 px-4 rounded-lg outline-none focus:border-blue-600"
            />

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              onChange={handleFormChange}
              value={form.fullName}
              className="border-2 border-gray-300 w-full py-2 px-4 rounded-lg outline-none focus:border-blue-600"
            />

            <div className="w-full flex items-center relative">
              <input
                type={isPassword ? 'password' : 'text'}
                name="password"
                id="password"
                placeholder="Enter your password"
                onChange={handleFormChange}
                value={form.password}
                className="border-2 border-gray-300 w-full py-2 px-4 rounded-lg outline-none focus:border-blue-600"
              />
              <span
                className="absolute right-[10px] cursor-pointer"
                onClick={() => {
                  setIsPassword(!isPassword);
                }}
              >
                <img src={isPassword ? hidden : eye} alt="" className="w-7" />
              </span>
            </div>

            <div className="w-full flex items-center relative">
              <input
                type={isPassword ? 'password' : 'text'}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your password"
                onChange={handleFormChange}
                value={form.confirmPassword}
                className="border-2 border-gray-300 w-full py-2 px-4 rounded-lg outline-none focus:border-blue-600"
              />
              <span
                className="absolute right-[10px] cursor-pointer"
                onClick={() => {
                  setIsPassword(!isPassword);
                }}
              >
                <img src={isPassword ? hidden : eye} alt="" className="w-7" />
              </span>
            </div>

            <button
              onClick={handleRegister}
              type="submit"
              className="block text-sm text-center px-2 py-3 w-[70%]  rounded-md bg-blue-600 text-white hover:scale-110 transition active:bg-blue-800 lg:px-6 lg:py-3"
            >
              Sign up
            </button>
          </form>
        </section>
      )}

      <Footer />
    </>
  );
};

export default SignUp;
