import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  form: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    status: '',
    phoneNumber: '',
    country: '',
  },
  isLoading: false,
  errorMsg: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleFormChange: (state, { payload }) => {
      const { name, value } = payload;
      state.form = { ...state.form, [name]: value };
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setErrorMsg: (state, { payload }) => {
      state.errorMsg = payload;
    },
  },
});

export const { handleFormChange, setIsLoading, setErrorMsg } =
  authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
