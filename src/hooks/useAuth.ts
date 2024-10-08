/* import { useDispatch, useSelector } from 'react-redux';
import { setIsSignedIn } from '../reducer/features/auth/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type LoginDetails = {
  password: string;
  email: string;
};

//SIGN IN FUNCTIONALITY
export const useLogin = async (loginDetails: LoginDetails) => {
  const dispatch = useDispatch();
  const { password, email } = loginDetails;
  if (!loginDetails) {
    alert('Please fill in the appopriate details');
    return;
  }
  try {
    const data = await axios.post(
      'https://houser-backend.onrender.com/api/v1/auth/user-login',
      {
        email,
        password,
      }
    );
    console.log(data);
    const userToken = data.data.token;
    localStorage.setItem('user', JSON.stringify(userToken));
    localStorage.setItem(
      'userData',
      JSON.stringify({
        username: data.data.username,
        email: data.data.email,
        fullName: data.data.fullName,
      })
    );
    dispatch(setIsSignedIn());
    console.log(data);
  } catch (error: any) {
    console.error(error);
    return error.response.data.msg;
  }
};


 */
