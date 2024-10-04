import { Loader } from '@mantine/core';

const LoaderComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center my-48">
      <Loader size="100" color="gray" type="dots" />
      <p className="text-lg font-semibold"> Loading please wait... </p>
    </div>
  );
};

export default LoaderComponent;
