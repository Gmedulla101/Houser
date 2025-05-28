import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/LoaderComponent';
import DisplayCards from '../components/DisplayCards';
import Filter from '../components/Filter';
import searchIcon from '../assets/search.png';

//IMPORTING TYPES
import { PropertyDetails } from './CreatePost';

const AllProperties = () => {
  //SCROLL TO TOP ON COMPONENT MOUNT
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<PropertyDetails[]>([]);
  const [searchedData, setSearchedData] = useState<PropertyDetails[]>([]);

  const displayDataEl = filteredData.map(
    (filteredData: PropertyDetails, i: number) => {
      return <DisplayCards key={i} {...filteredData} />;
    }
  );

  const handleSearchBarChange = async (event: any) => {
    const { value } = event.target;
    if (value === '') {
      return;
    }

    try {
      setIsLoading(true);
      const data = await axios.get(
        `http://localhost:5000/properties/all-Properties?searchValue=${value}`
      );
      setSearchedData(data.data.searchedProps);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(searchedData);

  return (
    <>
      <Header />
      <section className="mt-24 xl:mt-28 md:p-0 px-4 xmd:px-5">
        <h1 className="text-3xl font-semibold pb-5 lg:text-4xl">
          {' '}
          We have carefully curated the listings, just{' '}
          <span className="text-blue-600"> pick and choose. </span>
        </h1>

        <Filter setIsLoading={setIsLoading} setFilteredData={setFilteredData} />

        <div className="searchInput flex justify-between mt-12 p-2 border-2 border-gray-200 rounded-lg shadow-lg">
          <input
            type="text"
            onChange={handleSearchBarChange}
            placeholder="Address, city or neighbourhood"
            className="outline-none w-[80%] bg-transparent"
          />

          <button className="bg-blue-600 flex gap-2 items-center py-2 px-4 rounded-lg justify-between hover:bg-blue-700">
            <img className="w-5" src={searchIcon} alt="Search icon" />

            <p className="text-white text-xs hidden xsm:block">Find property</p>
          </button>
        </div>

        {isLoading ? (
          <Loader size={'100'} />
        ) : (
          <div className="flex flex-wrap gap-16 justify-center items-center my-12">
            {filteredData?.length > 0 ? (
              displayDataEl
            ) : (
              <h1 className="font-semibold text-3xl text-center">
                There are currently no properties that fit your{' '}
                <span className="text-blue-600"> preference </span>
              </h1>
            )}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default AllProperties;
