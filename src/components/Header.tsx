import { useState } from 'react';

//IMPORTING ROUTING ASSETS
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`absolute top-0 left-0 w-full flex flex-col gap-2 text-center justify-between py-4 px-10 items-center bg-white mx-auto ${
        isOpen ? 'h-auto' : 'h-[4em]'
      }  overflow-hidden z-50 xmd:flex-row shadow-md`}
    >
      <div className="title-logo flex items-center justify-between w-full xmd:w-fit">
        <Link to={'/'}>
          <h1 className="text-3xl font-bold text-blue-800"> Houser </h1>
        </Link>
        <div
          className="w-8 h-8 bg-blue-400 cursor-pointer xmd:hidden"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        ></div>
      </div>

      <nav>
        <ul className="flex flex-col gap-4 xmd:flex-row">
          <li className="hover:text-blue-600 cursor-pointer p-1">
            {' '}
            <Link to={'/'}> Home </Link>
          </li>

          <li className="hover:text-blue-600 cursor-pointer p-1">
            <Link to={'/properties'}> About us </Link>
          </li>

          <li className="hover:text-blue-600 cursor-pointer p-1">
            <Link to={'/properties'}>Properties</Link>
          </li>

          <li className="hover:text-blue-600 p-1">
            {' '}
            <Link to={'/properties'}>Services</Link>{' '}
          </li>
        </ul>
      </nav>

      <nav>
        <ul className="flex flex-col gap-2 xmd:flex-row">
          <li className="hover:text-blue-600 cursor-pointer p-1">Contact us</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
