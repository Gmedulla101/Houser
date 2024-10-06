import { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LoaderComponent from '../components/LoaderComponent';
import DisplayCards from '../components/DisplayCards';
import Filter from '../components/Filter';

//IMPORTING TYPES
import { PropertyDetails } from './CreatePost';

const MyProperties = () => {
  const [filteredData, setFilteredData] = useState<PropertyDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //GETTING USER TOKEN FROM LOCALSTORAGE
  const storedValue = localStorage.getItem('user');
  if (!storedValue) {
    throw new Error('There is no user logged in');
  }
  const token = JSON.parse(storedValue);

  //MAPPING THROUGH AND DISPLAYING DATA
  const displayDataEl = filteredData?.map(
    (filteredData: PropertyDetails, i: number) => {
      return <DisplayCards key={i} {...filteredData} />;
    }
  );

  console.log(filteredData);

  //MAIN COMPONENT BODY
  return (
    <>
      <Header />
      <section className="mt-24 xl:mt-28 md:p-0 px-2 xmd:px-12">
        <span className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold pb-5 lg:text-4xl xl:text-6xl">
            {' '}
            View and manage your
            <span className="text-blue-600"> listings. </span>
          </h1>

          <Link
            to={'/create-property'}
            className="font-semibold text-center px-2 py-3  rounded-md bg-blue-600 text-white  transition hover:bg-white hover:text-blue-600  active:bg-blue-800 lg:px-6 lg:py-3"
          >
            {' '}
            Create new listing{' '}
          </Link>
        </span>

        <Filter
          setIsLoading={setIsLoading}
          setFilteredData={setFilteredData}
          token={token}
        />

        {isLoading ? (
          <LoaderComponent />
        ) : (
          <div className="flex flex-wrap gap-5 justify-center items-center my-12">
            {filteredData?.length > 0 ? (
              displayDataEl
            ) : (
              <h1 className="font-semibold text-3xl text-center">
                There are currently no properties that fit your preference
              </h1>
            )}
          </div>
        )}
        {filteredData ? (
          ''
        ) : (
          <h1 className="text-3xl font-semibold pb-5 lg:text-4xl xl:text-6xl text-center">
            You haven't created any{' '}
            <span className="text-blue-600">listings</span> yet
          </h1>
        )}
      </section>
      <Footer />
    </>
  );
};

export default MyProperties;
