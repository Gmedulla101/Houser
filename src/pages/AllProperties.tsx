import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/LoaderComponent';
import DisplayCards from '../components/DisplayCards';
import Filter from '../components/Filter';

//IMPORTING TYPES
import { PropertyDetails } from './CreatePost';

const AllProperties = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<PropertyDetails[]>([]);

  const displayDataEl = filteredData.map(
    (filteredData: PropertyDetails, i: number) => {
      return <DisplayCards key={i} {...filteredData} />;
    }
  );

  return (
    <>
      <Header />
      <section className="mt-24 xl:mt-28 md:p-0 px-2 xmd:px-12">
        <h1 className="text-3xl font-semibold pb-5 lg:text-4xl">
          {' '}
          We have carefully curated the listings, just{' '}
          <span className="text-blue-600"> pick and choose. </span>
        </h1>
        <Filter setIsLoading={setIsLoading} setFilteredData={setFilteredData} />

        {isLoading ? (
          <Loader />
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
      </section>
      <Footer />
    </>
  );
};

export default AllProperties;
