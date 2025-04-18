import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/userContext';
import { BASE_API_URL } from '../components/Featured';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../redux/store';

//ALL THINGS REDUX TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading, setErrorMsg } from '../redux/features/auth/authSlice';

const TEST_API = import.meta.env.VITE_DEV_API;

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { setIsSignedIn, setUser } = useGlobalContext();

  const { form } = useSelector((store: RootState) => store.auth);
  const reset = useSelector((store: RootState) => store.reset);

  const handleRegister = async () => {
    try {
      dispatch(setIsLoading(true));
      const data = await axios.post(
        `${BASE_API_URL}/api/v1/auth/register-user`,
        form
      );
      const userToken = data.data.token;
      localStorage.setItem('houser-user', JSON.stringify(userToken));
      localStorage.setItem(
        'userData',
        JSON.stringify({
          username: data.data.username,
          email: data.data.email,
          fullName: data.data.fullName,
          id: data.data.id,
        })
      );
      setIsSignedIn(true);
      setUser({
        username: data.data.username,
        email: data.data.email,
        fullName: data.data.fullName,
        id: data.data.id,
      });
      navigate('/');
      dispatch(setIsLoading(false));
    } catch (error: any) {
      dispatch(setIsLoading(false));
      console.error(error);
      dispatch(setErrorMsg(error.response.data.msg));
    }
  };
  const getPasswordResetCode = async () => {
    const { email } = reset;
    try {
      dispatch(setIsLoading(true));
      await axios.post(`${TEST_API}/api/v1/auth/confirm-email`, { email });
      toast.success('Email confirmed!');
      dispatch(setIsLoading(false));
    } catch (error: any) {
      dispatch(setIsLoading(false));
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error.message);
      }
    }
  };

  const resetPassword = async () => {
    const { email, code, password, confirmPassword } = reset;
    try {
      if (!email || !code || !password || !confirmPassword) {
        toast.error('Please fill all fields');
      }

      dispatch(setIsLoading(true));

      await axios.post(`${TEST_API}/api/v1/auth/reset-password`, {
        email,
        code,
        password,
      });

      toast.success('Password reset successfully!');
      dispatch(setIsLoading(false));

      setTimeout(() => {
        navigate('/sign-in');
      }, 3000);
    } catch (error: any) {
      dispatch(setIsLoading(false));
      if (error.response.data.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error.message);
      }
    }
  };

  return {
    handleRegister,
    getPasswordResetCode,
    resetPassword,
  };
};

export default useAuth;
