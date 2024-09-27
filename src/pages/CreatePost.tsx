//REACT HOOKS
import { useState } from 'react';

//HELPER COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';

//UI COMPONENTS
import { CIcon } from '@coreui/icons-react';
import { cilImage, cilX } from '@coreui/icons';

const CreatePost = () => {
  const [displayImage, setDisplayImage] = useState<any>();
  const setImage = (e: any) => {
    const { files, name } = e.target;
    setDisplayImage(URL.createObjectURL(files[0]));
  };

  return (
    <>
      <Header />
      <section className="mt-24 xl:mt-28 md:p-0 px-2 xmd:px-12">
        <h1 className="text-3xl font-semibold pb-5 lg:text-4xl xl:text-6xl">
          Be part of the housing experience.
        </h1>
        <section className="createInputs my-10">
          <label
            htmlFor="image"
            onChange={setImage}
            className="border-2 border-gray-400 w-full h-64 rounded-xl flex flex-col items-center justify-center p-2"
          >
            <input type="file" id="image" name="imageFile" className="hidden" />
            {displayImage ? (
              <img src={displayImage} />
            ) : (
              <div className="flex flex-col items-center justify-center">
                {' '}
                <CIcon icon={cilImage} size="xl" className="w-[50%] h-[50%]" />
                <p> Add an image of your property </p>{' '}
              </div>
            )}
          </label>
          <div className="flex justify-end">
            {displayImage ? (
              <button
                onClick={() => {
                  setDisplayImage(undefined);
                }}
                className="bg-white rounded-full py-1 px-4 mt-1 opacity-60 flex items-center"
              >
                {' '}
                <CIcon icon={cilX} size="xl" className="w-6" /> Remove image
              </button>
            ) : (
              ''
            )}
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
};

export default CreatePost;
