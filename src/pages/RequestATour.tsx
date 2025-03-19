//IMPORTING HELPER COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';

const RequestATour = () => {
  return (
    <>
      <Header />
      <section className="mt-24 px-5 xmd:px-10">
        <h1 className="font-semibold text-2xl md:text-4xl lg:text-5xl">
          Let's get your <span className="text-blue-600">house hunting</span>{' '}
          started!
        </h1>
        <p className="mt-10">
          Finding properties and connecting to caretakers and landlords has
          never been easier or{' '}
          <span className="text-blue-600 font-semibold">cheaper!</span>
        </p>

        <p className="mt-10">
          To keep <span className="text-blue-600 font-semibold">Houser</span>{' '}
          running, we require a fee to connect our users (You lovely people) to
          overseers of their desired property
        </p>

        <div className="mt-10">
          <table className="flex flex-col mx-auto w-[90%] border rounded-xl overflow-hidden">
            <thead className="w-full p-2 bg-blue-600 text-white font-semibold text-lg">
              <tr className="flex justify-between">
                <td className="w-full text-center">Fee</td>
                <td className="w-full text-center">Amount</td>
              </tr>
            </thead>
            <tbody className="w-full font-semibold">
              <tr className="flex justify-between">
                <td className="w-full text-center border border-gray-500 rounded-bl-xl p-2">
                  {' '}
                  Hunting permit{' '}
                </td>
                <td className="w-full text-center border border-gray-500 rounded-br-xl p-2">
                  {' '}
                  #5,000{' '}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          {' '}
          <button className="block font-semibold text-center px-2 py-3 mt-8 mx-auto w-1/2 rounded-md bg-blue-600 text-white transition  hover:bg-gray-200 hover:text-blue-600 active:bg-blue-800 lg:px-6 lg:py-3">
            Make payment
          </button>{' '}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default RequestATour;
