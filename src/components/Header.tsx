import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`flex flex-col gap-2 text-center justify-between py-4 px-10 items-center bg-white mx-auto ${
        isOpen ? 'h-auto' : 'h-[4em]'
      }  overflow-hidden z-50 xmd:flex-row`}
    >
      <div className="title-logo flex items-center justify-between w-full xmd:w-fit">
        <h1 className="text-3xl font-bold text-purple-700"> Houser </h1>
        <div
          className="w-8 h-8 bg-blue-400 cursor-pointer xmd:hidden"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        ></div>
      </div>

      <nav>
        <ul className="flex flex-col gap-4 xmd:flex-row">
          <li className="hover:text-green-600 hover:border-b-2 hover:border-green-600 cursor-pointer p-1">
            Home
          </li>
          <li className="hover:text-green-600 hover:border-b-2 hover:border-green-600 cursor-pointer p-1">
            About Us
          </li>
          <li className="hover:text-green-600 hover:border-b-2 hover:border-green-600 cursor-pointer p-1">
            Properties
          </li>
          <li className="hover:text-green-600 hover:border-b-2 hover:border-green-600 cursor-pointer p-1">
            Services
          </li>
        </ul>
      </nav>

      <nav>
        <ul className="flex flex-col gap-2 xmd:flex-row">
          <li className="hover:text-green-600 hover:border-b-2 hover:border-green-600 cursor-pointer p-1">
            Contact us
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
