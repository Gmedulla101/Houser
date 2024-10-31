import { useNavigate } from 'react-router-dom';

//IMPORTING HELPER COMPONENTS
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoaderComponent from '../../components/LoaderComponent';

//IMPORTING IMAGE ASSETS
import home from '../../assets/home.png';

//IMPORTING STATE MANAGEMENT TOOLS
import { useDispatch, useSelector } from 'react-redux';
import {
  handleFormChange,
  setIsLoading,
  setErrorMsg,
} from '../../features/auth/authSlice';

const Names = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, errorMsg, form } = useSelector((state: any) => state.auth);

  const handleRegister = (e: any) => {
    e.preventDefault();
    try {
      dispatch(setIsLoading(true));
      const { username, fullName } = form;

      if (!username || !fullName) {
        throw new Error('Please fill in all appopriate details');
      }
      navigate('/signupflow-email_confirmation');
      dispatch(setIsLoading(false));
    } catch (err: any) {
      dispatch(setIsLoading(false));
      dispatch(setErrorMsg(err.message));
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
