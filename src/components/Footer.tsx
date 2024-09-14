const Footer = () => {
  return (
    <section className="px-2 mt-10 lg:px-12 flex flex-col bg-gray-100 pb-12 md:justify-between md:items-center">
      <div className="newsletter mb-8">
        <h1 className="text-3xl font-semibold text-blue-600"> Houser </h1>
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

      <div className="options w-full flex flex-col gap-5 md:flex-row md:justify-between">
        <ul>
          <li> About us </li>
          <li> Our story </li>
          <li> Our works </li>
          <li> How it works </li>
        </ul>

        <ul>
          <li> Properties </li>
          <li> Wanna sell? </li>
        </ul>

        <ul>
          <li> Services </li>
          <li> Property valuation </li>
          <li> Personalised house hunting </li>
          <li> Property management </li>
        </ul>

        <ul>
          <li> Contact us </li>
        </ul>
      </div>
    </section>
  );
};

export default Footer;
