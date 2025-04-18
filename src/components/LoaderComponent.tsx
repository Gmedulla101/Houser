import { Loader } from '@mantine/core';

const LoaderComponent = ({ size }: { size: string }) => {
  return (
    <div className="flex flex-col justify-center items-center my-48">
      <Loader size={`${size}`} color="blue" type="dots" />
     
    </div>
  );
};

export default LoaderComponent;
