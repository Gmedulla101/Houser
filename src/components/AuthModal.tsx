import { Link } from 'react-router-dom';

const AuthModal = () => {
  return (
    <section className=" transition duration-100 w-full h-full top-0 left-0 z-[100] fixed">
      <div className="w-[80%] h-[40vh] z-[101] relative top-36 mx-auto bg-white shadow border-2 border-slate-200 p-4 rounded-lg flex flex-col justify-around">
        <span>
          <h1 className="text-3xl text-center font-semibold">
            You are not signed in
          </h1>
          <p className="text-slate-500">
            You must be signed in to use our core services
          </p>
        </span>

        <span className="flex gap-3">
          <Link
            to={'/signupflow-name&username'}
            className={`block text-sm text-center px-2 py-3 w-full  rounded-md bg-blue-600 text-white hover:scale-110 transition active:bg-blue-800 lg:px-6 lg:py-3`}
          >
            <button>Create an account</button>
          </Link>
          <Link
            to={'/sign-in'}
            className={`block text-sm text-center px-2 py-3 w-full  rounded-md bg-blue-600 text-white hover:scale-110 transition active:bg-blue-800 lg:px-6 lg:py-3`}
          >
            <button>Login</button>
          </Link>
        </span>
      </div>
      <div className="w-full h-[100vh] bg-white opacity-65 absolute top-0 z-[90]"></div>
    </section>
  );
};

export default AuthModal;
