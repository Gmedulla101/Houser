import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

//IMPORTING HELPER COMPONENTS
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoaderComponent from '../../components/LoaderComponent';

//IMPORTING IMAGE ASSETS
import home from '../../assets/home.png';

//IMPORTING REDUX TOOLKIT TOOLS
import { useDispatch, useSelector } from 'react-redux';
import {
  handleFormChange,
  setIsLoading,
  setErrorMsg,
} from '../../redux/features/auth/authSlice';

//IMPORTING BASE API URL
import { BASE_API_URL } from '../../components/Featured';

const EmailConfirmation = () => {
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
    const { email } = form;

    try {
      if (!email) throw new Error('Please put in your email');
      dispatch(setIsLoading(true));

      await axios.get(
        `${BASE_API_URL}/api/v1/user/checkUser?${email ? `email=${email}` : ''}`
      );

      dispatch(setErrorMsg(''));
      navigate('/signupflow-passwords');
      dispatch(setIsLoading(false));
    } catch (error: any) {
      dispatch(setIsLoading(false));

      dispatch(setErrorMsg(error.response.data.msg));
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

          <form className="signUpForm flex flex-col gap-5 items-center w-[90%] md:w-96">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your Email"
              onChange={(e) => {
                dispatch(
                  handleFormChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                );
              }}
              value={form.email}
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

export default EmailConfirmation;
