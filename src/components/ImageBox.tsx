import { useState } from 'react';
//UI COMPONENTS
import { CIcon } from '@coreui/icons-react';
import { cilImage, cilX } from '@coreui/icons';

interface ImageBoxProps {
  setImg: Function;
  width: string;
  height: string;
  index: number;
  img: any;
}

const ImageBox: React.FC<ImageBoxProps> = ({
  setImg,
  width,
  height,
  index,
}) => {
  const [displayImage, setDisplayImage] = useState<any>();

  const setImage = (e: any) => {
    const { files } = e.target;
    setImg((prevImg: any) => {
      prevImg[index] = files[0];
      return prevImg;
    });
    setDisplayImage(URL.createObjectURL(files[0]));
  };

  return (
    <div>
      {' '}
      <label
        htmlFor={`image${index}`}
        onChange={setImage}
        className={`border-2 border-gray-400 ${width} ${height} rounded-xl flex flex-col items-center justify-center p-2 cursor-pointer overflow-hidden`}
      >
        <input
          type="file"
          id={`image${index}`}
          name="imgUrl"
          className="hidden"
        />
        {displayImage ? (
          <img src={displayImage} className="w-full h-full" />
        ) : (
          <div className="flex flex-col items-center justify-center">
            {' '}
            <CIcon icon={cilImage} size="xl" className="w-[50%] h-[50%]" />
            <p> Add an image </p>{' '}
          </div>
        )}
      </label>
      <div className="flex justify-end">
        {displayImage ? (
          <button
            onClick={() => {
              setDisplayImage(undefined);
              setImg((prevImg: any) => {
                prevImg[index] = '';
                return prevImg;
              });
            }}
            className="bg-gray-300 rounded-full py-1 px-4 mt-3 opacity-60 flex items-center"
          >
            {' '}
            <CIcon icon={cilX} size="xl" className="w-6" /> Remove image
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default ImageBox;
