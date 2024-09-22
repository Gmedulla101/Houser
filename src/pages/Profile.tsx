import Header from '../components/Header';
import Footer from '../components/Footer';
import { useGlobalContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { setIsSignedIn } = useGlobalContext();

  const logout = () => {
    localStorage.clear();
    setIsSignedIn(false);
    navigate('/');
  };

  return (
    <>
      <Header />
      <section className="px-4 mt-24">
        <h1 className="text-3xl font-semibold">Edit Profile</h1>
        <div className="editableDetails mt-8 flex flex-col gap-5">
          <span>
            <h3 className="text-xl font-semibold">Email</h3>
            <span className="flex gap-8">
              <p> johndoe@gmail.com </p>
              <button className="text-blue-600 hover:underline">Edit</button>
            </span>
          </span>

          <span>
            <h3 className="text-xl font-semibold">Username</h3>
            <span className="flex gap-8">
              <p> JohhnyBoy </p>
              <button className="text-blue-600 hover:underline">Edit</button>
            </span>
          </span>
        </div>

        <div className="basicDetails mt-12 flex flex-col gap-3">
          <span>
            <p className="text-xl font-semibold">Full name:</p>
            <p className="text-gray-600"> John Doe </p>
          </span>

          <span>
            <p className="text-xl font-semibold">Phone number:</p>
            <p className="text-gray-600"> 08012312312 </p>
          </span>

          <span>
            <p className="text-xl font-semibold">Location:</p>
            <p className="text-gray-600"> Edo State </p>
          </span>
        </div>

        <div className="logout flex justify-center">
          <button
            onClick={logout}
            className="block text-sm text-center px-2 py-3 my-12 w-64  rounded-md bg-blue-600 text-white hover:scale-110 transition active:bg-blue-800 lg:px-6 lg:py-3"
          >
            Logout
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Dashboard;
