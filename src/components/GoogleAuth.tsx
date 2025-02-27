import googleLogo from '../assets/google-symbol.png';

const handleGoogleAuth = async () => {
  window.location.href = 'http://localhost:5000/api/v1/auth/google-working';
};

const GoogleAuth = () => {
  return (
    <div
      onClick={handleGoogleAuth}
      className="flex gap-2 justify-center items-center border-2 border-gray-200 py-2 px-4 rounded-lg mb-6 cursor-pointer hover:bg-gray-200 active:bg-gray-300"
    >
      {' '}
      <img src={googleLogo} className="w-5 h-5" /> <p>Sign in with Google</p>{' '}
    </div>
  );
};

export default GoogleAuth;
