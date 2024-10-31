import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/userContext';

//ALL THINGS REDUX TOOLKIT
import { useSelector } from 'react-redux';
import {
  handleFormChange,
  setIsLoading,
  setErrorMsg,
} from '../features/auth/authSlice';

const useAuth = () => {
  const navigate = useNavigate();
  const { setIsSignedIn, setUser } = useGlobalContext();

  const { form, isLoading, errorMsg } = useSelector((store: any) => store.auth);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const { confirmPassword, password, email, username, fullName } = form;
    if (!form) {
      setErrorMsg('Please fill in the appopriate details');
      return;
    }
    if (confirmPassword !== password) {
      setErrorMsg('Passwords do not match');
      return;
    }
    try {
      setIsLoading(true);
      const data = await axios.post(
        'https://houser-backend.onrender.com/api/v1/auth/register-user',
        {
          email,
          password,
          username,
          fullName,
        }
      );
      const userToken = data.data.token;
      localStorage.setItem('user', JSON.stringify(userToken));
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
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
      setErrorMsg(error.response.data.msg);
    }
  };

  return {
    form,
    errorMsg,
    isLoading,
    setIsLoading,
    setErrorMsg,
    handleFormChange,
    handleRegister,
  };
};

export default useAuth;
