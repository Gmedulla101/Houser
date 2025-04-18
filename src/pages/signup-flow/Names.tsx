import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

//IMPORTING HELPER COMPONENTS
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoaderComponent from '../../components/LoaderComponent';
import GoogleAuth from '../../components/GoogleAuth';

//IMPORTING IMAGE ASSETS
import home from '../../assets/home.png';

//IMPORTING STATE MANAGEMENT TOOLS
import { useDispatch, useSelector } from 'react-redux';
import {
  handleFormChange,
  setIsLoading,
  setErrorMsg,
} from '../../redux/features/auth/authSlice';
import { BASE_API_URL } from '../../components/Featured';

const Names = () => {
  //SCROLL TO TOP ON COMPONENT MOUNT
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, errorMsg, form } = useSelector((state: any) => state.auth);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(setIsLoading(true));
      const { username, fullName } = form;

      if (!username || !fullName) {
        throw new Error('Please fill in all appopriate details');
      }

      const response = await axios.get(
        `${BASE_API_URL}/api/v1/user/checkUser?${
          username ? `username=${username}` : ''
        }`
      );

      if (response.data.data === 'proceed') {
        navigate('/signupflow-email_confirmation');
        dispatch(setErrorMsg(''));
        dispatch(setIsLoading(false));
      } else {
        return;
      }
    } catch (error: any) {
      dispatch(setIsLoading(false));
      dispatch(setErrorMsg(error.message));
      dispatch(setErrorMsg(error.response.data.msg || error.message));
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <LoaderComponent size={'100'} />
      ) : (
        <section className="mt-24 flex flex-col items-center">
          <h1 className="text-center text-3xl font-semibold mb-5">
            {' '}
            Create your <span className="text-blue-600">Houser</span> account
          </h1>

          <img src={home} alt="home" className="w-48 mb-12" />

          <div className="errorPopup w-[80%] mx-auto">
            {' '}
            {errorMsg ? (
              <p className="border-2 border-red-400 bg-red-300 text-white font-semibold px-4 py-2 mb-2 rounded-lg transtion text-center">
                {errorMsg}
              </p>
            ) : (
              ''
            )}
          </div>

          <div className="w-[90%] md:w-96">
            <GoogleAuth />
          </div>

          <form className="signUpForm flex flex-col gap-5 items-center w-[90%] md:w-96">
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              onChange={(e) => {
                dispatch(
                  handleFormChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                );
              }}
              value={form.fullName}
              className="border-2 border-gray-300 w-full py-2 px-4 rounded-lg outline-none focus:border-blue-600"
            />

            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={(e) => {
                dispatch(
                  handleFormChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                );
              }}
              value={form.username}
              className="border-2 border-gray-300 w-full py-2 px-4 rounded-lg outline-none focus:border-blue-600"
            />

            <button
              onClick={handleRegister}
              type="submit"
              className="block text-sm text-center px-2 py-3 w-[70%]  rounded-md bg-blue-600 text-white hover:scale-110 transition active:bg-blue-800 lg:px-6 lg:py-3"
            >
              Next
            </button>
          </form>
        </section>
      )}

      <Footer />
    </>
  );
};

export default Names;
