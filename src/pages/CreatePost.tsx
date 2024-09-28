//REACT HOOKS
import { useState } from 'react';
//HELPER COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
//UI COMPONENTS
import { CIcon } from '@coreui/icons-react';
import { cilImage, cilX } from '@coreui/icons';
//OTHER DEPS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//MAIN COMPONENT BODY
const CreatePost = () => {
  type PropertyDetails = {
    imgUrl: string;
    title: string;
    desc: string;
    price: number | string;
    bedrooms: number | string;
    location: string;
    propertyType: string;
  };

  const [displayImage, setDisplayImage] = useState<any>();
  const [img, setImg] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();

  const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;

  const setImage = (e: any) => {
    const { files } = e.target;
    setImg(files[0]);
    setDisplayImage(URL.createObjectURL(files[0]));
  };

  const [newPropDetails, setNewPropDetails] = useState<PropertyDetails>({
    imgUrl: '',
    title: '',
    desc: '',
    price: '',
    bedrooms: '',
    location: '',
    propertyType: '',
  });

  const uploadImage = async (image: any) => {
    try {
      if (
        (image && image.type === 'image/png') ||
        (image && image.type === 'image/jpg') ||
        (image && image.type === 'image/jpeg')
      ) {
        const imageObject = new FormData();
        imageObject.append('file', image);
        imageObject.append('upload_preset', upload_preset);

        const data = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          imageObject
        );
        return data.data.url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addNewPropDetails = (event: any) => {
    const { name, value } = event.target;
    setNewPropDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  const submitDetails = async () => {
    try {
      setIsLoading(true);
      const imageUrl = await uploadImage(img);
      if (!imageUrl) {
        throw new Error('No image');
      }
      setNewPropDetails((prev) => {
        return {
          ...prev,
          imgUrl: `${imageUrl}`,
        };
      });

      console.log(newPropDetails);

      const storedValue = localStorage.getItem('user');
      if (!storedValue) {
        throw new Error('There is no user logged in');
      }
      const token = JSON.parse(storedValue);

      const resp = await axios.post(
        'http://localhost:5000/api/v1/properties/add-property',
        newPropDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/my-properties');
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
      setErrorMsg(error.response.data.msg);
    }
  };

  return (
    <>
      <Header />

      {isLoading ? (
        <Loader />
      ) : (
        <section className="mt-24 xl:mt-28 md:p-0 px-2 xmd:px-12">
          <h1 className="text-3xl font-semibold pb-5 lg:text-4xl xl:text-6xl">
            Be part of the housing experience.
          </h1>
          <section className="createInputs my-10">
            <label
              htmlFor="image"
              onChange={setImage}
              className="border-2 border-gray-400 w-full h-96 rounded-xl flex flex-col items-center justify-center p-2 cursor-pointer overflow-hidden"
            >
              <input type="file" id="image" name="imgUrl" className="hidden" />
              {displayImage ? (
                <img src={displayImage} className="w-full h-full" />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  {' '}
                  <CIcon
                    icon={cilImage}
                    size="xl"
                    className="w-[50%] h-[50%]"
                  />
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

            <div className="errorPopup">
              {' '}
              {errorMsg ? (
                <p className="border-2 border-red-400 bg-red-300 text-white text-center font-semibold px-4 py-2 mb-2 rounded-lg transtion mt-8">
                  {errorMsg}
                </p>
              ) : (
                ''
              )}
            </div>
            <div className="text-inputs flex flex-col gap-2 my-8">
              <input
                type="text"
                name="title"
                placeholder="Enter a title for your property (e.g. Name of Hostel etc.)"
                value={newPropDetails.title}
                onChange={addNewPropDetails}
                className="border-2 border-gray-400 rounded-lg h-12 px-4 outine-none focus:border-blue-600"
              />
              <textarea
                name="desc"
                placeholder="Describe your property in good detail"
                value={newPropDetails.desc}
                onChange={addNewPropDetails}
                className="border-2 border-gray-400 rounded-lg h-56 py-2 px-4 outine-none focus:border-blue-600 resize-none"
              />
              <input
                type="number"
                name="bedrooms"
                placeholder="How bedrooms are there?"
                value={newPropDetails.bedrooms}
                onChange={addNewPropDetails}
                className="border-2 border-gray-400 rounded-lg h-12 px-4 outine-none focus:border-blue-600"
              />

              <select
                name="propertyType"
                id="propertyType"
                value={newPropDetails.propertyType}
                onChange={addNewPropDetails}
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
                value={newPropDetails.location}
                onChange={addNewPropDetails}
                placeholder="Specify the property location"
                className="border-2 border-gray-400 rounded-lg h-12 px-4 outine-none focus:border-blue-600"
              />
              <input
                type="number"
                name="price"
                placeholder="How much does it cost?"
                value={newPropDetails.price}
                onChange={addNewPropDetails}
                className="border-2 border-gray-400 rounded-lg h-12 px-4 outine-none focus:border-blue-600"
              />
            </div>
            <button
              onClick={submitDetails}
              className="block font-semibold text-center px-2 py-3 w-full  rounded-md bg-blue-600 text-white  transition hover:bg-white hover:text-blue-600  active:bg-blue-800 lg:px-6 lg:py-3"
            >
              Add listing
            </button>
          </section>
        </section>
      )}
      <Footer />
    </>
  );
};

export default CreatePost;
