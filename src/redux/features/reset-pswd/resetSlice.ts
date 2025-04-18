import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  code: '',
  password: '',
  confirmPassword: '',
  isLoading: false,
};

const reset = createSlice({
  name: 'reset',
  initialState,
  reducers: {
    handleChange: (state: any, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },

    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { handleChange, setLoader } = reset.actions;

const resetReducer = reset.reducer;

export default resetReducer;
