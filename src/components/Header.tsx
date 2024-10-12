import { useState } from 'react';
import { useGlobalContext } from '../context/userContext';

//IMPORTING UI DEPENDENCIES
import { CIcon } from '@coreui/icons-react';
import { cilMenu } from '@coreui/icons';

//IMPORTING ROUTING ASSETS
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useGlobalContext();

  return (
    <header
      className={`absolute top-0 left-0 w-full flex flex-col gap-2 text-center justify-between py-4 px-10 items-center bg-white mx-auto ${
        isOpen ? 'h-auto' : 'h-[4em]'
      }  overflow-hidden z-50 xmd:flex-row shadow-md`}
    >
      <div className="title-logo flex items-center justify-between w-full xmd:w-fit">
        <Link to={'/'}>
          <h1 className="text-3xl font-bold text-blue-600"> Houser </h1>
        </Link>
        <div
          className="w-8 h-8 cursor-pointer xmd:hidden"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </div>
      </div>

      <nav className="flex flex-col gap-4 xmd:flex-row">
        <Link to={'/'} className="hover:text-blue-600 cursor-pointer p-1">
          Home
        </Link>
        <Link
          to={'/about-us'}
          className="hover:text-blue-600 cursor-pointer p-1"
        >
          About us
        </Link>
        <Link
          to={'/properties'}
          className="hover:text-blue-600 cursor-pointer p-1"
        >
          Properties
        </Link>

        <Link
          to={'/properties'}
          className="hover:text-blue-600 cursor-pointer p-1"
        >
          Services
        </Link>
      </nav>

      <nav>
        {isSignedIn ? (
          <div className="flex flex-col gap-2 xmd:flex-row">
            <Link
              to={'/my-properties'}
              className=" cursor-pointer p-1 border-2 rounded-lg block w-36 bg-blue-600 text-white hover:scale-110 transition duration-300"
            >
              Your listings
            </Link>

            <Link
              to={'/profile'}
              className="cursor-pointer p-1 bg-gray-200 text-blue-600 rounded-lg block w-36 hover:scale-110 transition duration-300"
            >
              Profile
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2 xmd:flex-row">
            <Link
              to={'/sign-up'}
              className=" cursor-pointer p-1 border-2 rounded-lg block w-36 bg-blue-600 text-white hover:scale-110 transition duration-300"
            >
              Sign up
            </Link>

            <Link
              to={'/sign-in'}
              className="cursor-pointer p-1 bg-gray-200 text-blue-600 rounded-lg block w-36 hover:scale-110 transition duration-300"
            >
              Sign in
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
