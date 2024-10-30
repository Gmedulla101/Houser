import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

//IMPORTING HELPER COMPONENTS
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoaderComponent from '../../components/LoaderComponent';

//IMPORTING IMAGE ASSETS
import home from '../../assets/home.png';

const Names = () => {
  const navigate = useNavigate();

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

  const handleRegister = (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { username, fullName } = form;

      if (!username || !fullName) {
        throw new Error('Please fill in all appopriate details');
      }
      navigate('/signupflow-email');
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message);
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
              name="fullName"
              placeholder="Enter your full name"
              onChange={handleFormChange}
              value={form.fullName}
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
