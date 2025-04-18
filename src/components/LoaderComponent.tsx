import { Loader } from '@mantine/core';

const LoaderComponent = ({
  size,
  margin,
  color,
}: {
  size?: string;
  margin?: string;
  color?: string;
}) => {
  return (
    <div
      className={`flex flex-col justify-center items-center ${
        margin ? `my-${margin}` : 'my-48'
      }`}
    >
      <Loader size={`${size}`} color={color ? color : 'blue'} type="dots" />
    </div>
  );
};

export default LoaderComponent;
