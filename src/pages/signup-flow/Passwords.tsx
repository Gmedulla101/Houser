import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//IMPORTING HELPER COMPONENTS
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoaderComponent from '../../components/LoaderComponent';

//IMPORTING IMAGE ASSETS
import home from '../../assets/home.png';
import hidden from '../../assets/hidden.png';
import eye from '../../assets/eye.png';

//IMPORTING REDUX TOOLKIT TOOLS
import { useDispatch, useSelector } from 'react-redux';
import {
  handleFormChange,
  setErrorMsg,
  setIsLoading,
} from '../../features/auth/authSlice';

const Passwords = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { errorMsg, isLoading, form } = useSelector((state: any) => state.auth);
  const [isPassword, setIsPassword] = useState<boolean>(true);

  const handleRegister = async (e: any) => {
    e.preventDefault();

    try {
      dispatch(setIsLoading(true));
      const { confirmPassword, password } = form;
      if (!confirmPassword || !password) {
        throw new Error('Cannot proceed without passwords');
      }
      navigate('/signupflow-user_user-role');
      dispatch(setIsLoading(false));
    } catch (error: any) {
      dispatch(setIsLoading(false));

      dispatch(setErrorMsg(error.message));
    }
  };

  console.log(form);

  return (
    <>
      <Header />
      {isLoading ? (
        <LoaderComponent />
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
            <div className="w-full flex items-center relative">
              <input
                type={isPassword ? 'password' : 'text'}
                name="password"
                id="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  dispatch(
                    handleFormChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  );
                }}
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
                onChange={(e) => {
                  dispatch(
                    handleFormChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  );
                }}
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
              Next
            </button>
          </form>
        </section>
      )}

      <Footer />
    </>
  );
};

export default Passwords;
