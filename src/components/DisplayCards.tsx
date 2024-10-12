//IMPORTING NEEDED DEPENDENCIES
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

//IMPORTING IMAGE ASSETS
import bed from '../assets/bed.png';
import villa from '../assets/cardHome.png';
import locationPointer from '../assets/location.png';

//IMPORTING TYPES
import { PropertyDetails } from '../pages/CreatePost';

//IMPORTING UI DEPS
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';

const DisplayCards = ({
  imgUrl,
  title,
  desc,
  bedrooms,
  propertyType,
  location,
  price,
  featured,
  _id,
}: PropertyDetails) => {
  //ASSERTATING LOCATION TO DISPLAY DELETE BUTTON
  const currLocation = useLocation();

  //SETTING UP DELETE FUNCTIONALITY
  const deleteProperty = async () => {
    try {
      const storedValue = localStorage.getItem('user');
      if (!storedValue) {
        console.error('There is no user logged in');
        return;
      }

      const token = JSON.parse(storedValue);

      await axios.delete(
        `http://localhost:5000/api/v1/properties/delete-property/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card flex flex-col justify-between shadow-3xl border-2 border-gray-300 shadow-xl rounded-lg p-2 w-[350px] h-[600px]">
      <img src={imgUrl[0]} alt={`${title}`} className="h-[270px] rounded-lg" />
      <h3 className="font-semibold mt-3 text-lg w-[300px]">{title}</h3>
      <p className="text-xs text-gray-400"> {featured ? 'Featured' : ''} </p>
      <p className="text-gray-600 text-sm mt-2">{desc.slice(0, 100)}...</p>

      <div className="properties flex mt-5 gap-2 flex-wrap">
        <span className="flex items-center gap-1 border-2 border-gray-400 px-3 py-2 rounded-3xl">
          <img src={bed} alt="" className="w-5" />
          <p className="text-xs">{bedrooms}-bedroom</p>
        </span>

        <span className="flex items-center gap-1 border-2 border-gray-400 px-3 py-2 rounded-3xl">
          <img src={locationPointer} alt="" className="w-5" />
          <p className="text-xs capitalize">{location}</p>
        </span>

        <span className="flex items-center gap-1 border-2 border-gray-400 px-3 py-2 rounded-3xl">
          <img src={villa} alt="" className="w-5" />
          <p className="text-xs">{propertyType}</p>
        </span>
      </div>

      <div className="priceView flex items-center justify-between mt-5">
        <span>
          <p className="text-xs">Price:</p>
          <p className="font-semibold">N{price}</p>
        </span>
        <Link
          to={`/view-property/${_id}`}
          className="text-white bg-blue-600 rounded-lg px-4 py-2 transition hover:scale-105"
        >
          View property details
        </Link>
      </div>

      {/* DELETE BUTTON */}
      {currLocation.pathname === '/my-properties' ? (
        <div
          onClick={deleteProperty}
          className="flex items-center justify-center gap-2 mt-3 bg-red-600 rounded-lg text-white p-2 transition hover:bg-gray-200 hover:text-red-600 cursor-pointer"
        >
          <CIcon icon={cilTrash} className="w-5" />
          <p>Delete Property</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default DisplayCards;
