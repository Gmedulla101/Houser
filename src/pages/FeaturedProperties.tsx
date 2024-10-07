import { useState } from 'react';

//IMPORTING HELPER COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoaderComponent from '../components/LoaderComponent';
import DisplayCards from '../components/DisplayCards';
import Filter from '../components/Filter';

//IMPORTING TYPES
import { PropertyDetails } from './CreatePost';

const FeaturedProperties = () => {
  const [isLoading, setIsLoading] = useState(true);

  //FILTER VARIABLES
  const [filteredData, setFilteredData] = useState<PropertyDetails[]>([]);

  const displayDataEl = filteredData?.map(
    (filteredData: PropertyDetails, i: number) => {
      return <DisplayCards key={i} {...filteredData} />;
    }
  );

  //HANDLING THE DATA FILTERING SYSTEM

  return (
    <>
      <Header />
      <section className="mt-24 xl:mt-28 md:p-0 px-2 xmd:px-12">
        <h1 className="text-3xl font-semibold pb-5 lg:text-4xl">
          {' '}
          These are our most trusted and vetted properties, just{' '}
          <span className="text-blue-600"> pick and choose. </span>
        </h1>

        <Filter setFilteredData={setFilteredData} setIsLoading={setIsLoading} />

        {isLoading ? (
          <LoaderComponent />
        ) : (
          <div className="flex flex-wrap gap-5 justify-center items-center my-12">
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

export default FeaturedProperties;
