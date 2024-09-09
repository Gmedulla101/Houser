import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header
        className={`flex flex-col gap-2 text-center justify-between p-2 items-center ${
          isOpen ? 'h-auto' : 'h-[3em]'
        }  overflow-hidden`}
      >
        <div className="title-logo flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-green-600"> GoShoppe </h1>
          <div
            className="w-8 h-8 bg-green-600 cursor-pointer"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          ></div>
        </div>

        <nav>
          <ul className="flex flex-col gap-2">
            <li className="hover:text-green-600 hover:border-b-2 hover:border-green-600 cursor-pointer p-1">
              Category
            </li>
            <li className="hover:text-green-600 hover:border-b-2 hover:border-green-600 cursor-pointer p-1">
              Top deals
            </li>
            <li className="hover:text-green-600 hover:border-b-2 hover:border-green-600 cursor-pointer p-1">
              What's new
            </li>
            <li className="hover:text-green-600 hover:border-b-2 hover:border-green-600 cursor-pointer p-1">
              Wanna sell?
            </li>
          </ul>
        </nav>

        <nav>
          <input
            type="text"
            placeholder="Search for a product"
            className="border-2 border-slate-400 py-2 px-4 rounded-full outline-none focus:border-green-400"
          />
        </nav>

        <nav>
          <ul className="flex flex-col gap-2">
            <li className="hover:text-green-600 hover:border-b-2 hover:border-green-600 cursor-pointer p-1">
              Account
            </li>
            <li className="hover:text-green-600 hover:border-b-2 hover:border-green-600 cursor-pointer p-1">
              Cart
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
