const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center my-48">
      <span className="loading loading-ring w-[20%]"></span>
      <p className="text-lg font-semibold"> Loading please wait... </p>
    </div>
  );
};

export default Loader;
