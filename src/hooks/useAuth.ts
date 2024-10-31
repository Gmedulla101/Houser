import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/userContext';

//ALL THINGS REDUX TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading, setErrorMsg } from '../features/auth/authSlice';

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setIsSignedIn, setUser } = useGlobalContext();

  const { form } = useSelector((store: any) => store.auth);

  const handleRegister = async () => {
    try {
      dispatch(setIsLoading(true));
      const data = await axios.post(
        'https://houser-backend.onrender.com/api/v1/auth/register-user',
        form
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
      dispatch(setIsLoading(false));
    } catch (error: any) {
      dispatch(setIsLoading(false));
      console.error(error);
      dispatch(setErrorMsg(error.response.data.msg));
    }
  };

  return {
    handleRegister,
  };
};

export default useAuth;
