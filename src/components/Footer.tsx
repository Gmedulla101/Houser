const Footer = () => {
  return (
    <section className="px-2 mt-10 lg:px-12 flex flex-col bg-gray-100 pb-12 md:justify-between">
      <h1 className="text-3xl font-semibold text-blue-600 mb-3 lg:text-4xl">
        {' '}
        Houser{' '}
      </h1>

      <section className="utilities flex flex-col md:justify-between">
        <div className="newsletter mb-8">
          <h2 className="my-3 text-gray-600">
            {' '}
            Join our newsletter, we curate the best possible oppurtunities and
            arrange them in an easily digestible way for your perusal
          </h2>
          <span className="flex gap-2">
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter your email"
              className="outline-none border-2 border-gray-400 rounded-lg text-base p-2 w-full"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              {' '}
              Join{' '}
            </button>
          </span>
        </div>

        <div className="options text-sm w-full flex flex-col gap-5 md:flex-row md:justify-between md:px-6">
          <ul>
            <li className="hover:text-blue-600 cursor-pointer p-1">
              {' '}
              About us{' '}
            </li>
            <li className="hover:text-blue-600 cursor-pointer p-1">
              Our story
            </li>
            <li className="hover:text-blue-600 cursor-pointer p-1">
              Our works
            </li>
            <li className="hover:text-blue-600 cursor-pointer p-1">
              How it works
            </li>
          </ul>

          <ul>
            <li className="hover:text-blue-600 cursor-pointer p-1">
              Properties
            </li>
            <li className="hover:text-blue-600 cursor-pointer p-1">
              {' '}
              Wanna sell?{' '}
            </li>
          </ul>

          <ul>
            <li className="hover:text-blue-600 cursor-pointer p-1">
              {' '}
              Services{' '}
            </li>
            <li className="hover:text-blue-600 cursor-pointer p-1">
              {' '}
              Property valuation{' '}
            </li>
            <li className="hover:text-blue-600 cursor-pointer p-1">
              {' '}
              Personalised house hunting{' '}
            </li>
            <li className="hover:text-blue-600 cursor-pointer p-1">
              {' '}
              Property management{' '}
            </li>
          </ul>

          <ul>
            <li className="hover:text-blue-600 cursor-pointer p-1">
              {' '}
              Contact us{' '}
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
};

export default Footer;
