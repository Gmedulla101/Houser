const ExtraHomeText = () => {
  return (
    <section className="px-2 mt-10 lg:px-12 flex flex-col md:flex-row md:justify-between md:items-center">
      <div className="extraText w-[70%]">
        <h1 className="text-3xl font-semibold mb-3 lg:text-4xl xl:text-6xl">
          Let's get you your own space.
        </h1>
        <p className="text-sm text-gray-600 ">
          Your dream property is just a click away. Whether you're looking for a
          trendy self-con, a flat for yourself (and your friends 😏), Houser is
          here to assist you every step of the way. Take the first step towards
          getting your place and explore our available properties or get in
          touch with our team for personalized assistance.
        </p>
      </div>

      <div className="extraLink mt-12 md:m-0 md:w-[20%]">
        <a
          href="#"
          className="block text-sm text-center px-2 py-3  w-full  rounded-md bg-blue-600 text-white hover:scale-110 transition active:bg-blue-800 lg:px-6 lg:py-3"
        >
          {' '}
          Explore Properties{' '}
        </a>
      </div>
    </section>
  );
};

export default ExtraHomeText;
