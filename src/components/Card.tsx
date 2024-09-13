import bathImg from '../assets/bath.png';
import bed from '../assets/bed.png';
import villa from '../assets/home.png';

const Card = ({ imgUrl, title, desc, price, bedrooms, bath, type }) => {
  return (
    <div className="shadow-3xl border-2 border-gray-300 shadow-xl rounded-lg p-2 w-[300px] mx-auto">
      <img src={imgUrl} alt="Houser home" />
      <h3 className="font-semibold mt-3 text-lg">{title}</h3>
      <p className="text-gray-600 text-sm mt-2">{desc.slice(0, 100)}...</p>

      <div className="properties flex mt-5 gap-2 flex-wrap">
        <span className="flex items-center gap-1 border-2 border-gray-400 px-3 py-2 rounded-3xl">
          <img src={bed} alt="" className="w-5" />
          <p className="text-xs">{bedrooms}-bedroom</p>
        </span>

        <span className="flex items-center gap-1 border-2 border-gray-400 px-3 py-2 rounded-3xl">
          <img src={bathImg} alt="" className="w-5" />
          <p className="text-xs">{bath}-bathroom</p>
        </span>

        <span className="flex items-center gap-1 border-2 border-gray-400 px-3 py-2 rounded-3xl">
          <img src={villa} alt="" className="w-5" />
          <p className="text-xs">{type}</p>
        </span>
      </div>

      <div className="priceView flex items-center justify-between mt-5">
        <span>
          <p className="text-xs">Price:</p>
          <p className="font-semibold">${price}</p>
        </span>
        <a
          href="#"
          className="text-white bg-blue-600 rounded-lg px-4 py-2 transition hover:scale-105"
        >
          {' '}
          View property details{' '}
        </a>
      </div>
    </div>
  );
};

export default Card;
