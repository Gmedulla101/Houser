const Hero = () => {
  return (
    <section className="mt-24">
      <div className="heroText w-[40%] flex flex-col justify-center align-center gap-3 ml-24">
        <h1 className="text-6xl font-semibold">
          Get rid of housing hassles with{' '}
          <span className="text-purple-700">Houser</span>
        </h1>
        <p className="text-gray-600">
          Your journey to finding the perfect house for you begins here. Explore
          our listings to find the home that matches your dreams.
        </p>

        <span className="actionBtns flex gap-12">
          <a
            href="#"
            className="border-2 border-slate-400 px-6 py-3 rounded-md hover:scale-110 hover:bg-slate-300 transition"
          >
            Learn more
          </a>
          <a
            href="#"
            className="border-2 border-purple-500 px-6 py-3 rounded-md bg-purple-500 text-white hover:scale-110 transition active:bg-purple-800"
          >
            {' '}
            Browse Properties{' '}
          </a>
        </span>
        <div className="stats flex gap-12 mt-24">
          <span className="border-2 border-gray-400 px-4 py-2 rounded-md shadow-xl">
            <p className="text-4xl font-semibold"> 200+ </p>
            <p className="text-gray-600">Happy customers</p>
          </span>

          <span className="border-2 border-gray-400 px-4 py-2 rounded-md shadow-xl">
            <p className="text-4xl font-semibold"> 1k+ </p>
            <p className="text-gray-600">Properties for clients</p>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
