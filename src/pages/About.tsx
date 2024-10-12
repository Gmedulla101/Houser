//IMPORTING HELPER COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExtraHomeText from '../components/ExtraHomeText';

//IMPORTING IMAGE ASSETS
import handHouse from '../assets/aboutHero2.png';

//IMPORTING UI DEPS
import CIcon from '@coreui/icons-react';
import { cilStar, cilPeople, cilEducation } from '@coreui/icons';

const About = () => {
  return (
    <>
      <Header />

      <section className="px-2 mt-24 lg:px-12">
        <article className="flex flex-col gap-10 md:flex-row-reverse md:items-center md:justify-between">
          <div className="rounded-lg md:w-full">
            <img src={handHouse} alt="" className="w-full h-full" />
          </div>

          <article className="md:w-[70%]">
            <h1 className="text-3xl font-semibold mb-3 lg:text-4xl xl:text-6xl">
              Our Journey
            </h1>
            <p className="text-sm text-gray-600">
              Our story is one of continuous growth and evolution. We started as
              a small team with big dreams, determined to create a real estate
              platform that transcended the ordinary. Over the years, we've
              expanded our reach, forged valuable partnerships, and gained the
              trust of countless clients.
            </p>
            <aside className="stats flex items-center justify-center w-full gap-6 mt-5 xmd:flex-row xl:mt-10">
              <div className="border-2 border-gray-400 px-4 py-2 rounded-md shadow-xl w-full">
                <p className="text-xl font-semibold lg:text-2xl xl:text-4xl">
                  200+
                </p>
                <p className="text-xs lg:text-sm text-gray-600">
                  Happy customers
                </p>
              </div>

              <div className="border-2 border-gray-400 px-4 py-2 rounded-md shadow-xl w-[80%]">
                <p className="text-xl font-semibold lg:text-2xl xl:text-4xl">
                  {' '}
                  1k+{' '}
                </p>
                <p className="text-xs text-gray-600 lg:text-sm">Properties</p>
              </div>
            </aside>
          </article>
        </article>

        {/* OUR VALUES */}
        <section className="mt-36 flex flex-col gap-10 xmd:flex-row xmd:items-center">
          <div>
            <h1 className="text-3xl font-semibold mb-3 lg:text-4xl xl:text-6xl">
              Our values
            </h1>
            <p className="text-sm text-gray-600">
              Our story is one of continuous growth and evolution. We started as
              a small team with big dreams, determined to create a real estate
              platform that transcended the ordinary.
            </p>
          </div>

          <div className="flex flex-col gap-4 xmd:flex-row xmd:items-center">
            <aside className="flex flex-col gap-4 xmd:border-r-2 xmd:pr-5">
              <div className="border-b-2 pb-8 h-[130px] flex flex-col justify-center">
                <h1 className="font-semibold text-lg flex items-center gap-1">
                  <CIcon
                    icon={cilStar}
                    className="w-10 border-2 border-blue-600 p-2 rounded-full bg-blue-600 text-white"
                  />
                  Trust
                </h1>
                <p className="text-sm text-gray-600">
                  Trust is the cornerstone of every successful real estate
                  transaction.
                </p>
              </div>

              <div className="border-b-2 pb-8 h-[130px] flex flex-col justify-center">
                <h1 className="font-semibold text-lg flex items-center gap-1">
                  <CIcon
                    icon={cilEducation}
                    className="w-10 border-2 border-blue-600 p-2 rounded-full bg-blue-600 text-white"
                  />
                  Excellence
                </h1>
                <p className="text-sm text-gray-600">
                  We set the bar high for ourselves. From the roperties we list
                  to the services we provide.
                </p>
              </div>
            </aside>

            <aside className="flex flex-col gap-4">
              <div className="border-b-2 pb-8 h-[130px] flex flex-col justify-center">
                <h1 className="font-semibold text-lg flex items-center gap-1">
                  <CIcon
                    icon={cilPeople}
                    className="w-10 border-2 border-blue-600 p-2 rounded-full bg-blue-600 text-white"
                  />
                  Client-centric
                </h1>
                <p className="text-sm text-gray-600">
                  Your dreams and needs are at the center of our universe, we
                  listen and we understand.
                </p>
              </div>

              <div className="border-b-2 pb-8 h-[130px] flex flex-col justify-center">
                <h1 className="font-semibold text-lg flex items-center gap-1">
                  <CIcon
                    icon={cilStar}
                    className="w-10 border-2 border-blue-600 p-2 rounded-full bg-blue-600 text-white"
                  />
                  Our commitment
                </h1>
                <p className="text-sm text-gray-600">
                  We are dedicated to providing you with the highest level of
                  service and professionalism.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* GET STARTED */}
        <section className="mt-36">
          <ExtraHomeText />
        </section>
      </section>
      <Footer />
    </>
  );
};

export default About;
