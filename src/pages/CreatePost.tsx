//REACT HOOKS
import { useState, useEffect } from 'react';
//HELPER COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/LoaderComponent';
import ImageBox from '../components/ImageBox';

//OTHER DEPS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//UI COMPONENTS
import CIcon from '@coreui/icons-react';
import { cilPlus } from '@coreui/icons';

export type PropertyDetails = {
  imgUrl: any;
  title: string;
  desc: string;
  price: number | string;
  bedrooms: number | string;
  location: string;
  propertyType: string;
  featured?: boolean;
  _id?: string;
};

//MAIN COMPONENT BODY
const CreatePost = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState();
  const [img, setImg] = useState<any>([]);
  const [moreImages, setMoreImages] = useState<boolean>(false);

  const navigate = useNavigate();

  const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;

  const [newPropDetails, setNewPropDetails] = useState<PropertyDetails>({
    imgUrl: [],
    title: '',
    desc: '',
    price: '',
    bedrooms: '',
    location: '',
    propertyType: '',
    featured: false,
  });

  //FUNCTIONALITY TO UPLOAD IMAGES TO CLOUDINARY
  const uploadImage = async (imageArray: any) => {
    const uploadedUrls = await Promise.all(
      imageArray.map(async (image: any) => {
        try {
          if (
            (image && image.type === 'image/png') ||
            (image && image.type === 'image/jpg') ||
            (image && image.type === 'image/jpeg') ||
            (image && image.type === 'image/webp')
          ) {
            const imageObject = new FormData();
            imageObject.append('file', image);
            imageObject.append('upload_preset', upload_preset);

            const { data } = await axios.post(
              `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
              imageObject
            );
            return data.url;
          }
        } catch (error) {
          console.error(error);
        }

        return null;
      })
    );

    return uploadedUrls.filter((url) => url !== null);
  };

  const addNewPropDetails = (event: any) => {
    const { name, value, checked, type } = event.target;
    setNewPropDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  //FUNCTIONALITY TO CHANGE STATE ACCORDING TO IMAGE URL GOTTEN FROM CLOUDINARY
  const submitDetails = async () => {
    try {
      setIsLoading(true);
      const imageUrls = await uploadImage(img);

      setNewPropDetails((prev) => {
        return {
          ...prev,
          imgUrl: imageUrls,
        };
      });
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
      setErrorMsg(error.response.data.msg);
    }
  };

  //TRIGGER USEEFFECT ONCE IMAGE URL IS CONFIRMED
  useEffect(() => {
    const finalSubmit = async () => {
      try {
        const storedValue = localStorage.getItem('user');
        if (!storedValue) {
          throw new Error('There is no user logged in');
        }
        const token = JSON.parse(storedValue);

        await axios.post(
          'https://houser-backend.onrender.com/api/v1/properties/add-property',
          newPropDetails,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate('/my-properties');
      } catch (error) {
        console.error(error);
      }
    };
    if (newPropDetails.imgUrl && newPropDetails.imgUrl.length > 0) {
      finalSubmit();
    }
  }, [newPropDetails.imgUrl]);

  return (
    <>
      <Header />

      {isLoading ? (
        <Loader />
      ) : (
        <section className="mt-24 xl:mt-28 md:p-0 px-4 xmd:px-12">
          <h1 className="text-3xl font-semibold pb-5 lg:text-4xl xl:text-6xl">
            Be part of the housing experience.
          </h1>
          <section className="createInputs my-10">
            <div className="mx-auto lg:justify-center lg:w-[80%]">
              <ImageBox
                setImg={setImg}
                width="w-full"
                height="h-96"
                index={0}
                img={img}
              />
            </div>
            {moreImages ? (
              <div className="mt-5 flex flex-col gap-5 items-center justify-center lg:flex-row">
                <ImageBox
                  setImg={setImg}
                  width={'w-full'}
                  height="h-60"
                  index={1}
                  img={img}
                />
                <ImageBox
                  setImg={setImg}
                  width={'w-full'}
                  height="h-60"
                  index={2}
                  img={img}
                />
                <ImageBox
                  setImg={setImg}
                  width={'w-full'}
                  height="h-60"
                  index={3}
                  img={img}
                />
                <ImageBox
                  setImg={setImg}
                  width={'w-full'}
                  height="h-60"
                  index={4}
                  img={img}
                />
              </div>
            ) : (
              <div className="mt-5 flex flex-col items-center gap-2 ">
                <CIcon
                  icon={cilPlus}
                  onClick={() => {
                    setMoreImages(true);
                  }}
                  className="w-16 bg-blue-200 text-blue-600 rounded-full p-3 cursor-pointer transition hover:scale-110"
                />
                Add more images
              </div>
            )}

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
              <label htmlFor="featured" className="flex gap-3 mt-6">
                <p> Do you want your listing to be featured? </p>
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={newPropDetails.featured}
                  onChange={addNewPropDetails}
                  className="cursor-pointer"
                />
              </label>
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
