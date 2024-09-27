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
    const { files } = e.target;
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
            className="border-2 border-gray-400 w-full h-64 rounded-xl flex flex-col items-center justify-center p-2 cursor-pointer"
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

          <div className="text-inputs flex flex-col gap-2 my-8">
            <input
              type="text"
              name="title"
              placeholder="Enter a title for your property (e.g. Name of Hostel etc.)"
              className="border-2 border-gray-400 rounded-lg h-12 px-4 outine-none focus:border-blue-600"
            />
            <textarea
              name="desc"
              placeholder="Describe your property in good detail"
              className="border-2 border-gray-400 rounded-lg h-56 py-2 px-4 outine-none focus:border-blue-600 resize-none"
            />
            <input
              type="number"
              name="bedrooms"
              placeholder="How bedrooms are there"
              className="border-2 border-gray-400 rounded-lg h-12 px-4 outine-none focus:border-blue-600"
            />

            <select
              name="propertyType"
              id="propertyType"
              className="border-2 border-gray-400 rounded-lg h-12 px-4 outine-none focus:border-blue-600 cursor-pointer"
            >
              <option value="default"> Property type </option>
              <option value="self-con"> Self-con </option>
              <option value="a room and parlour"> A room and parlour </option>
              <option value="2 bedroom flat"> 2 bedroom flat </option>
              <option value="3 bedroom flat"> 3 bedroom flat </option>
              <option value="bungalow"> Bungalow </option>
              <option value="duplex"> Duplex </option>
            </select>

            <input
              type="text"
              name="location"
              placeholder="Specify the property location"
              className="border-2 border-gray-400 rounded-lg h-12 px-4 outine-none focus:border-blue-600"
            />
            <input
              type="number"
              name="price"
              placeholder="How much does it cost?"
              className="border-2 border-gray-400 rounded-lg h-12 px-4 outine-none focus:border-blue-600"
            />
          </div>
          <button className="block font-semibold text-center px-2 py-3 w-full  rounded-md bg-blue-600 text-white  transition hover:bg-white hover:text-blue-600  active:bg-blue-800 lg:px-6 lg:py-3">
            Add listing
          </button>
        </section>
      </section>
      <Footer />
    </>
  );
};

export default CreatePost;
