import bed from '../assets/bed.png';
import villa from '../assets/cardHome.png';
import locationPointer from '../assets/location.png';
import { Link } from 'react-router-dom';

type CardProps = {
  imgUrl: string;
  title: string;
  desc: string;
  price: number;
  bedrooms: number;
  location: string;
  propertyType: string;
  featured: boolean;
  _id?: string;
};

const Card = ({
  imgUrl,
  title,
  desc,
  price,
  bedrooms,
  location,
  propertyType,
  featured,
  _id,
}: CardProps) => {
  return (
    <div className="card shadow-3xl border-2 border-gray-300 shadow-xl rounded-lg p-2 w-[300px]">
      <img src={imgUrl} alt="Houser home" className="h-64" />
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
          <p className="font-semibold">${price}</p>
        </span>
        <Link
          to={`/view-property/${_id}`}
          className="text-white bg-blue-600 rounded-lg px-4 py-2 transition hover:scale-105"
        >
          View property details
        </Link>
      </div>
    </div>
  );
};

export default Card;
