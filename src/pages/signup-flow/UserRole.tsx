import { useEffect } from 'react';

//IMPORTING REQUIRED COMPONENTS
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoaderComponent from '../../components/LoaderComponent';

//IMPORTING IMAGE ASSETS
import hunter from '../../assets/caveman.png';
import landlord from '../../assets/house-owner (1).png';

//IMPORTING REDUX TOOLKIT TOOLS
import { useSelector, useDispatch } from 'react-redux';
import { handleFormChange } from '../../redux/features/auth/authSlice';

//IMPORTING AUTH HOOK
import useAuth from '../../hooks/useAuth';

const UserRole = () => {
  //SCROLL TO TOP ON COMPONENT MOUNT
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const dispatch = useDispatch();
  const { isLoading, form, errorMsg } = useSelector((state: any) => state.auth);
  const { handleRegister } = useAuth();

  return (
    <>
      {isLoading ? (
        <LoaderComponent size={'100'} />
      ) : (
        <section>
          <Header />
          <article className="mt-24">
            <h1 className="text-center text-3xl font-semibold">
              Choose your role
            </h1>

            <section className="mt-12 flex flex-col items-center gap-8 md:flex-row lg:w-[60vw] mx-auto">
              {/* HOUSE HUNTER */}
              <div className="w-72 h-[450px] border-2 border-slate-200 rounded-md shadow-lg mx-auto py-4 px-6 flex flex-col justify-between gap-4">
                <div>
                  <div className="mx-auto h-36 w-36">
                    <img src={hunter} alt="Houser hunter" />
                  </div>

                  <div className="mt-5">
                    <h1 className="font-semibold text-lg">House hunter</h1>
                    <ul className="list-disc list-inside flex flex-col gap-3 text-slate-500 text-sm">
                      <li>
                        You will be able to view houses and Interact with home
                        owners
                      </li>
                      <li>
                        {' '}
                        You will not be able to post listings and manage them{' '}
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      dispatch(
                        handleFormChange({
                          name: 'role',
                          value: 'hunter',
                        })
                      );
                    }}
                    className={`block text-sm text-center px-2 py-3 w-full  rounded-md ${
                      form.status === 'seeker' ? 'bg-slate-400' : 'bg-blue-600'
                    } text-white hover:scale-110 transition active:bg-blue-800 lg:px-6 lg:py-3`}
                  >
                    Select Role
                  </button>
                </div>
              </div>

              {/* LANDLORD */}
              <div className="w-72 h-[450px] border-2 border-slate-200 rounded-md shadow-lg mx-auto py-4 px-6 flex flex-col justify-between gap-4">
                <section>
                  <div className="mx-auto h-36 w-36">
                    <img src={landlord} alt="Houser hunter" />
                  </div>

                  <div className="mt-5">
                    <h1 className="font-semibold text-lg">
                      Landlord/Caretaker
                    </h1>
                    <ul className="list-disc list-inside flex flex-col gap-3 text-slate-500 text-sm">
                      <li>
                        You will be able to view houses and Interact with home
                        owners
                      </li>
                      <li>
                        {' '}
                        You will be able to post listings and manage them{' '}
                      </li>
                      <li>
                        {' '}
                        You will be subject to intense scrutiny to ensure the
                        safety of house hunters{' '}
                      </li>
                    </ul>
                  </div>
                </section>

                <div>
                  <button
                    onClick={() => {
                      dispatch(
                        handleFormChange({
                          name: 'role',
                          value: 'owner',
                        })
                      );
                    }}
                    className={`block text-sm text-center px-2 py-3 w-full  rounded-md ${
                      form.status === 'owner' ? 'bg-slate-400' : 'bg-blue-600'
                    } text-white hover:scale-110 transition active:bg-blue-800 lg:px-6 lg:py-3`}
                  >
                    Select Role
                  </button>
                </div>
              </div>
            </section>

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

            <div>
              <button
                onClick={handleRegister}
                className="block text-sm text-center mx-auto my-12 px-2 py-3 w-[80%]  rounded-md bg-blue-600 text-white hover:scale-110 transition active:bg-blue-800 lg:px-6 lg:py-3"
              >
                Finish registration
              </button>
            </div>
          </article>
          <Footer />
        </section>
      )}
    </>
  );
};

export default UserRole;
