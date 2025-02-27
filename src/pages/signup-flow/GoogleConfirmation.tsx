import Header from '../../components/Header';
import { useEffect } from 'react';
import { useGlobalContext } from '../../context/userContext';

//IMPORTING IMAGE ASSETS
import home from '../../assets/home.png';

//IMPORTING ROUTER DEPENDENCIES
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const GoogleConfirmation = () => {
  const [searchParams] = useSearchParams();
  const token: any = searchParams.get('token');

  const { setIsSignedIn } = useGlobalContext();
  useEffect(() => {
    if (!token) {
      throw new Error('Auth failure: Token is not present');
    }
    localStorage.setItem('houser-user', JSON.stringify(token));
    setIsSignedIn(true);
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="mt-24 px-5">
          <div className="flex justify-center">
            <img src={home} alt="Houser image" className="w-48" />
          </div>
          <h1 className="text-center font-bold text-3xl my-12">
            Welcome to Houser!
          </h1>
          <Link to={'/'}>
            <button className="block mx-auto bg-blue-600 py-3 px-6 rounded-lg text-white font-semibold transition hover:scale-105 active:bg-blue-700">
              Proceed to Home Page
            </button>
          </Link>
        </section>
      </main>
    </>
  );
};

export default GoogleConfirmation;
