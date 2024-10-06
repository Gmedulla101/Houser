import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

//IMPORTING TYPES

interface FilterProps {
  setFilteredData: Function;
  setIsLoading: Function;
}
const Filter: React.FC<FilterProps> = ({ setFilteredData, setIsLoading }) => {
  const currentLocation = useLocation();
  console.log(currentLocation);
  const isPageRendered = useRef(false);

  const [filterObj, setFilterObj] = useState({
    location: '',
    propertyType: '',
    pricingRange: '',
    bedrooms: '',
  });

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setFilterObj((prevObj) => {
      return { ...prevObj, [name]: value };
    });
  };

  useEffect(() => {
    const filterData = async () => {
      setIsLoading(true);
      const data = await axios.get(
        `http://localhost:5000/api/v1/properties${currentLocation.pathname}?${
          filterObj.location ? `location=${filterObj.location}` : ''
        }&${
          filterObj.propertyType ? `propertyType=${filterObj.propertyType}` : ''
        }&${
          filterObj.pricingRange ? `pricingRange=${filterObj.pricingRange}` : ''
        }&${filterObj.bedrooms ? `bedrooms=${filterObj.bedrooms}` : ''}`
      );
      setFilteredData(data.data.data);
      setIsLoading(false);
    };

    if (isPageRendered.current) {
      filterData();
    }

    isPageRendered.current = true;
  }, [filterObj]);

  return (
    <div className="filter mt-5 md:flex md:gap-2">
      <select
        onChange={handleChange}
        name="location"
        id="location"
        className="w-full border-2 border-gray-200 rounded-lg py-2 mb-3 outline-none text-center cursor-pointer"
      >
        <option value=""> Location </option>
        <option value="Ekosodin"> Ekosodin </option>
        <option value="Osasogie"> Osasogie </option>
        <option value="BDPA"> BDPA </option>
      </select>
      <select
        onChange={handleChange}
        name="propertyType"
        id="propertyType"
        className="w-full border-2 border-gray-200 rounded-lg py-2 mb-3 outline-none text-center cursor-pointer"
      >
        <option value=""> Property type </option>
        <option value="self-con"> Self-con </option>
        <option value="a room and parlour"> A room and parlour </option>
        <option value="2 bedroom flat"> 2 bedroom flat </option>
        <option value="3 bedroom flat"> 3 bedroom flat </option>
        <option value="bungalow"> Bungalow </option>
        <option value="duplex"> Duplex </option>
      </select>
      <select
        onChange={handleChange}
        name="pricingRange"
        id="pricingRange"
        className="w-full border-2 border-gray-200 rounded-lg py-2 mb-3 outline-none text-center cursor-pointer"
      >
        <option value=""> Pricing range </option>
        <option value="50000 - 100000"> N50,000 - N100,000 </option>
        <option value="100000 - 200000"> N100,000 - N200,000 </option>
        <option value="200000 - 300000"> N200,000 - N300,000 </option>
        <option value="300000 - 400000"> N300,000 - N400,000 </option>
        <option value="400000 - 500000"> N400,000 - N500,000 </option>
        <option value="500000 - 1000000"> N500,000 - N1000,000 </option>
        <option value="1000000 - e"> 1000,000 - </option>
      </select>

      <select
        onChange={handleChange}
        name="bedrooms"
        id="bedrooms"
        className="w-full border-2 border-gray-200 rounded-lg py-2 mb-3 outline-none text-center cursor-pointer"
      >
        <option value=""> Bedrooms </option>
        <option value="1"> 1 </option>
        <option value="2"> 2 </option>
        <option value="3"> 3 </option>
        <option value="4"> 4 </option>
        <option value="5"> 5 </option>
        <option value="> 5"> {'> 5'} </option>
      </select>
    </div>
  );
};

export default Filter;
