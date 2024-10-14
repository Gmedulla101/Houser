//IMPORTING DEPS
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/userContext';

//IMPORITNG HELPER COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoaderComponent from '../components/LoaderComponent';

//IMPORTING IMAGE ASSETS
import home from '../assets/home.png';
import hidden from '../assets/hidden.png';
import eye from '../assets/eye.png';

const SignIn = () => {
  const navigate = useNavigate();
  const { setIsSignedIn, setUser } = useGlobalContext();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState();

  const [isPassword, setIsPassword] = useState<boolean>(true);
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

  const handleSignIn = async () => {
    const { password, email } = form;
    if (!form) {
      alert('Please fill in the appopriate details');
      return;
    }
    try {
      setIsLoading(true);
      const data = await axios.post(
        'https://houser-backend.onrender.com/api/v1/auth/user-login',
        {
          email,
          password,
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
      console.error(error);
      setIsLoading(false);
      setErrorMsg(error.response.data.msg);
    }
  };

  return (
    <>
      <Header />

      {isLoading ? (
        <LoaderComponent />
      ) : (
        <form className="mt-24 flex flex-col items-center">
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

          <div className="signUpForm flex flex-col gap-5 items-center w-[90%] md:w-96">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your Email"
              onChange={handleFormChange}
              value={form.email}
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

            <button
              onClick={handleSignIn}
              type="submit"
              className="block text-sm text-center px-2 py-3 w-[70%]  rounded-md bg-blue-600 text-white hover:scale-110 transition active:bg-blue-800 lg:px-6 lg:py-3"
            >
              Sign in
            </button>
          </div>
        </form>
      )}

      <Footer />
    </>
  );
};

export default SignIn;
